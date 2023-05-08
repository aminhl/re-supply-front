import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { UsersService } from '../../services/fireBase/users.service';
import { Message } from 'src/app/shared/models/chat';
import { ProfileUser } from 'src/app/shared/models/user-profile';
import { ChatServiceService } from '../../services/fireBase/chat.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  @ViewChild('endOfChat')
  endOfChat!: ElementRef;

  user$ = this.usersService.currentUserProfile$;
  myChats$ = this.chatsService.myChats$;

  searchControl = new FormControl('');
  messageControl = new FormControl('');
  chatListControl = new FormControl('');

  messages$: Observable<Message[]> | undefined;

  otherUsers$ = combineLatest([this.usersService.allUsers$, this.user$]).pipe(
    map(([users, user]) => users.filter((u) => u.uid !== user?.uid))
  );

  users$ = combineLatest([
    this.otherUsers$,
    this.searchControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([users, searchString]) => {
      return users.filter((u) =>
        u.firstName?.toLowerCase().includes(searchString.toLowerCase())
      );
    })
  );

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$,
  ]).pipe(map(([value, chats]) => chats.find((c) => c.id === value[0])));

  constructor(
    private usersService: UsersService,
    private chatsService: ChatServiceService
  ) {}

  ngOnInit(): void {
    this.messages$ = this.chatListControl.valueChanges.pipe(
      map((value) => value[0]),
      switchMap((chatId) => this.chatsService.getChatMessages$(chatId)),
      tap(() => {
        this.scrollToBottom();
      })
    );
  }

  createChat(user: ProfileUser) {
    this.chatsService
      .isExistingChat(user.uid)
      .pipe(
        switchMap((chatId) => {
          if (!chatId) {
            return this.chatsService.createChat(user);
          } else {
            return of(chatId);
          }
        })
      )
      .subscribe((chatId) => {
        this.chatListControl.setValue([chatId]);
      });
  }

  sendMessage() {
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0];
    if (message && selectedChatId) {
      this.chatsService
        .addChatMessage(selectedChatId, message)
        .subscribe(() => {
          this.scrollToBottom();
        });
      this.messageControl.setValue('');
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
