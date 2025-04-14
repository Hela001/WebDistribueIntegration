import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatService } from '../chat.service'; // Import the chat service

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent {
  userMessage: string = ''; // User's input message
  botResponse: string = ''; // Chatbot's response
  chatHistory: { sender: string, message: string }[] = []; // Store messages

  constructor(
    public dialogRef: MatDialogRef<ChatDialogComponent>, 
    private chatService: ChatService // Inject the chat service
  ) {}

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.chatHistory.push({ sender: 'User', message: this.userMessage }); // Add user message
  
      // Send the user's message to the backend to get a response
      this.chatService.sendChatPrompt(this.userMessage).subscribe(
        (response) => {
          this.botResponse = response;  // Bot response from backend (now plain text)
          this.chatHistory.push({ sender: 'Bot', message: this.botResponse }); // Add bot response to chat history
        },
        (error) => {
          console.error('Error getting response from bot:', error);
          this.botResponse = 'Error: Unable to get response from bot.';  // Handle errors
          this.chatHistory.push({ sender: 'Bot', message: this.botResponse }); // Add error message to chat history
        }
      );
  
      this.userMessage = ''; // Clear input field after sending message
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Close the dialog box
  }
}
