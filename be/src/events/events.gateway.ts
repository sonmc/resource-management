import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    clients = [];
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket, ...args: any[]) {
        let user_id = client.handshake.query.user_id;
        console.log('Client connected:', client.id);
        this.clients.push({ client_id: client.id, user_id });
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
        this.clients = this.clients.filter((x) => x.client_id !== client.id);
    }

    @SubscribeMessage('notification')
    handleNotification(client: Socket, payload: any) {
        this.server.emit('notification', payload);
    }
    sendToAll(message: any) {
        this.server.emit('notification', message);
    }
    sendToClient(user_id, message: any) {
        let client = this.clients.find((x) => x.user_id == user_id);
        if (client) this.server.to(client.client_id).emit('notification', message);
    }
    sendToClients(user_ids: string[], message: string): void {
        let clients = this.clients.filter((x) => user_ids.includes(x.user_id));
        for (const client of clients) {
            this.server.to(client.client_id).emit('notification', message);
        }
    }
}
