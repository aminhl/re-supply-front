import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatService } from 'src/app/shared/services/chatService/chat.service';

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
  connectedUserId: any;
  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.chatService.searchChatUsers(this.searchTerm).subscribe((res) => {
      this.chatUsers = res;
    });
    this.authService.getUser().subscribe((res) => {
      this.connectedUserId = res.data.user._id;
    });
  }

  ngOnInit(): void {}

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
      console.log(res);
    });
  }
}
