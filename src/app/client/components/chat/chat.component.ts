import { ChangeDetectorRef, Component, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chatService/chat.service';
import { MessagesService } from 'src/app/shared/services/messageService/messages.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  showDropdown = false;
  visibleSidebar1 = false;
  chatUsers: any;
  searchTerm: any;
  selectedUsers: Array<any> = [];
  connectedUserId: any;
  myChats: any;
  userIsSelected: boolean;
  groupName: string;
  selecTedChat: any;
  selecedChatId: any;
  chatName: string;
  sendMessageForm: FormGroup;
  content: FormControl;
  allMessages: any;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private messageService: MessagesService
  ) {
    this.searchChatUsers();
    this.authService.getUser().subscribe((res) => {
      this.connectedUserId = res.data.user._id;
      console.log(this.connectedUserId);
    });
    this.fetchMychats();
    this.createSendMessageForm();
  }
  ngOnInit(): void {}

  fetchMychats() {
    this.chatService.fetchUserChats().subscribe((res) => {
      this.myChats = res;
      console.log('my chats', this.myChats);
    });
  }
  fetchAllMessages(chatId: any) {
    this.messageService.fetchMessages(chatId).subscribe((res) => {
      this.allMessages = res;
      console.log('my all messages', this.allMessages);
    });
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  toggleSideBar() {
    this.visibleSidebar1 = !this.visibleSidebar1;
  }
  loading = [false, false, false, false];

  load(index) {
    this.loading[index] = true;
    setTimeout(() => (this.loading[index] = false), 1000);
  }
  searchChatUsers() {
    this.chatService.searchChatUsers(this.searchTerm).subscribe((res) => {
      this.chatUsers = res;
      console.log(this.chatUsers);
    });
  }
  onSearchTermChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    if (this.searchTerm === '' || this.searchTerm === undefined) {
      this.ngZone.run(() => {
        this.chatUsers = []; // Clear the chatUsers array if the search term is empty
      });
    } else this.searchChatUsers();
  }
  groupNameValue(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.ngZone.run(() => {
      this.groupName = value;
      if (this.groupName === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ' Group name is required',
        });
      }
    });
  }

  onMouseEnter() {
    const container = event.target as HTMLElement;
    container.style.backgroundColor = 'rgba(131, 100, 226, 0.1)';
  }

  onMouseLeave() {
    const container = event.target as HTMLElement;
    container.style.backgroundColor = 'white';
  }
  accessChat(userId: any) {
    this.chatService.accessChat(userId).subscribe((res) => {
      this.ngZone.run(() => {
        this.myChats.push(res);
      });
    });
  }
  getSender(connectedUserId: any, usersChat) {
    return usersChat[0]._id === connectedUserId ? usersChat[1] : usersChat[0];
  }

  openModal() {
    this.chatUsers = []; // Clear the chatUsers array when the modal is opened
  }
  closeModal() {
    this.chatUsers = []; // Clear the chatUsers array when the modal is closed
    this.searchTerm = ''; // Clear the search term when the modal is closed
    window.location.reload();
  }
  addToSelectedUsers(chatUser: any) {
    if (!this.selectedUsers.includes(chatUser)) {
      this.selectedUsers.push(chatUser);
      this.userIsSelected = true;
      console.log('selectedUsers', this.selectedUsers);
    }
  }
  removeFromSelectedUsers(chatUser: any) {
    const index = this.selectedUsers.indexOf(chatUser);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    }
    this.userIsSelected = false;
    console.log('users when removeed', this.selectedUsers);
  }

  createGroup() {
    if (this.selectedUsers.length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' More than 2 users are required to form a group chat',
      });
    } else if (this.groupName === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: ' Group name is required',
      });
    } else {
      this.chatService
        .createGroup(this.selectedUsers, this.groupName)
        .subscribe((res) => {
          console.log('selectedUsers before ngZone', res);
          this.ngZone.run(() => {
            this.myChats.push(res);
            console.log('myChats after ngZone', this.myChats);
          });
        });
    }
  }

  getSelectedChat(selecTedChat: any) {
    this.chatName = selecTedChat.chatName;
    this.selectedUsers = selecTedChat.users;
    this.selecedChatId = selecTedChat._id;
    this.selecTedChat = selecTedChat;
    console.log('selectedChat', this.selecTedChat);
  }

  updateGroupName(chatId: any, chatName: any) {
    console.log('selectedChat men update Groupnmzr');
    this.chatService.renameGroup(chatId, chatName).subscribe((res) => {
      this.ngZone.run(() => {
        this.selecTedChat = res;
        this.chatName = this.selecTedChat.chatName;
        this.fetchMychats();
      });

      console.log('selectedChat updated ', this.selecTedChat);
    });
  }
  addUserToGroup(chatId: any, userId: any) {
    this.chatService.addToGroup(chatId, userId).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          console.log('res', res.users);
          this.selectedUsers = res.users;
        });
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }
  removeUserFromGroup(chatId: any, userId: any) {
    if (this.connectedUserId === this.selecTedChat.groupAdmin._id) {
      this.chatService.removeFromGroup(chatId, userId).subscribe({
        next: (res) => {
          this.ngZone.run(() => {
            console.log('res', res.users);
            this.selectedUsers = res.users;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'User Deleted Successfully',
              showConfirmButton: false,
              timer: 1000,
            });
          });
        },
        error: (err) => {
          console.error('An error occurred:', err);
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Only Admin Group Can Delete Users!',
      });
    }
  }

  leaaveGroupChat(chatId: any, userId: any) {
    this.chatService.removeFromGroup(chatId, userId).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          console.log('res', res.users);
          this.fetchMychats();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You Left The Group',
            showConfirmButton: false,
            timer: 1000,
          });
        });
      },
      error: (err) => {
        console.error('An error occurred:', err);
      },
    });
  }

  createSendMessageForm() {
    this.sendMessageForm = this.formBuilder.group({
      content: new FormControl('', [Validators.required]),
    });
  }

  sendMessage(chatId: string) {
    console.log('ya rab la3mel 3lik');
    const a = this.sendMessageForm.get('content').value;
    this.messageService.postMessage(chatId, a).subscribe({
      next: (res) => {
        console.log('msgVal', res);
        this.sendMessageForm.get('content').setValue('');
      },
      error: (err) => {
        console.error('Error adding msg:', err);
      },
    });
  }
}
