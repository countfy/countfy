import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TimerGateway {
  @WebSocketServer()
  server: Server;

  private timerRunning = false;

  @SubscribeMessage('timer:status')
  handleTimerStatus(client: any, data: any) {
    client.emit('timer:status', this.timerRunning);
  }

  startTimer() {
    // Start the timer
    this.timerRunning = true;
    this.server.emit('timer:status', this.timerRunning);
  }

  stopTimer() {
    // Stop the timer
    this.timerRunning = false;
    this.server.emit('timer:status', this.timerRunning);
  }
}
