import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Chat } from "src/app/models/chat.model";
import { MessageP } from "src/app/models/messageP.model";
import { User } from "src/app/models/user.model";
import { ChatService } from "src/app/services/chat.service";
import { MessageService } from "src/app/services/message.service";
import { SecurityService } from "src/app/services/security.service";
import { WebSocketService } from "src/app/services/web-socket.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-chatp",
  templateUrl: "./chatp.component.html",
  styleUrls: ["./chatp.component.scss"],
})
export class ChatpComponent implements OnInit, AfterViewChecked {
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;
  theUser: User;
  from_email: string;
  chat_id: number;
  messages: MessageP[] = [];
  messagesDB: any;
  newMessage: string = "";
  messageSubscription: Subscription;
  userSubscription: Subscription;
  urlPhoto: string;

  constructor(
    private webSocketService: WebSocketService,
    private theSecurityService: SecurityService,
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  getSecurityService() {
    return this.theSecurityService;
  }

  ngOnInit() {
    this.from_email = this.activatedRoute.snapshot.params.email;

    this.theSecurityService
      .getUser()
      .subscribe((user: User) => (this.theUser = user));

    this.chatService
      .getChatByUsers(this.theUser.email, this.from_email)
      .subscribe((chat: Chat) => {
        console.log("chat", chat);
        if (chat) {
          this.chat_id = chat.id;
          this.syncMessages();
        } else {
          this.chatService
            .create({
              to: this.from_email,
              from: this.theUser.email,
            })
            .subscribe((chat: Chat) => {
              this.chat_id = chat.id;
              this.syncMessages();
            });
        }
      });

    this.userSubscription = this.theSecurityService
      .getUser()
      .subscribe((data) => {
        this.theUser = data;
      });
    // this.getUrlPhoto();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  syncMessages() {
    this.messageService
      .getMessagesByChat(this.chat_id.toString())
      .subscribe((data) => {
        this.messagesDB = data;
        this.messagesDB.forEach((msg: MessageP) => {
          this.messages.push(msg);
        });
        this.scrollToBottom();
      });
    this.messageSubscription = this.webSocketService
      .onMessage()
      .subscribe((msg: MessageP) => {
        msg.chat_id = this.chat_id;
        this.messages.push(msg);
        this.scrollToBottom();
      });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: MessageP = {
        content: this.newMessage,
        chat_id: this.chat_id,
        user_email: this.theUser.email,
      };
      this.webSocketService.sendMessage(message);
      this.newMessage = "";
    }
  }

  deleteMessages() {
    // Confirmar antes de eliminar los mensajes con Swal
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, bórralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        // llama al servicio para eliminar los mensajes
        this.messageService
          .deleteMessagesByChat(this.chat_id.toString())
          .subscribe((data) => {
            this.messages = [];
            Swal.fire(
              "Eliminado!",
              "Los mensajes han sido eliminados.",
              "success",
            );
          });
      }
    });
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  // getUrlPhoto() {
  //   this.urlPhoto = this.theSecurityService.getGithubProfileImage(
  //     this.theUser.user_github
  //   );
  // }
}
