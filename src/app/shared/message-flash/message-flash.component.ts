import { Component, ChangeDetectorRef } from '@angular/core';
import { MessageFlashService, MessageFlashOption } from '../services/message-flash.service';

class Message {
    id: number;
    message: string;
    cssClass: string;
    visible: string;
}

@Component({
    selector: 'message-flash',
    templateUrl: './message-flash.component.html',
    styleUrls: ['./message-flash.component.sass'],
})

export class MessageFlashComponent {
    messageStorage: Array<Message> = [];
    blockPosition: string = 'center';
    static autoIncrement: number = 0;

    constructor(private messageFlashService: MessageFlashService, private _cdRef: ChangeDetectorRef) {
        messageFlashService.flashMessage = this.pushMessage.bind(this);
        messageFlashService.setPosition = this.setPosition.bind(this);
    }

    pushMessage(message: string, options?: MessageFlashOption): void {
        options = options ? options : {
            cssClass: 'default',
            timeOut: 5000
        };
        options.cssClass = options.cssClass ? options.cssClass : 'default';
        options.timeOut = options.timeOut && options.timeOut > 3000 ? options.timeOut : 3000;

        const _id = MessageFlashComponent.autoIncrement += 1;
        const mes: Message = {
            id: _id,
            message: message,
            cssClass: options.cssClass,
            visible: 'show'
        };
        if (this.messageStorage.length > 4) {
            this.messageStorage.shift();
        }
        this.messageStorage.push(mes);
        this._cdRef.detectChanges();

        return this.delayMessage(options.timeOut, _id);
    }

    setPosition(position: string) {
        this.blockPosition = position;
    }

    delayMessage(timeOut, _id) {
        setTimeout(() => {
            return this.removeMessage(_id);
        }, timeOut);
        return;
    }

    removeMessage(_id) {
        let _mes = this.messageStorage.find(mes => mes.id === _id) || null;
        if (_mes) {
            _mes.visible = 'hidden';
            setTimeout(() => {
                this.messageStorage = this.messageStorage.filter((mes) => {
                    return mes.id !== _id;
                });
                this._cdRef.detectChanges();
            }, 500);
        }
        return;
    }
}