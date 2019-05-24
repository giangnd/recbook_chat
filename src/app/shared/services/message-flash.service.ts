import { Injectable } from '@angular/core';

interface MessageFlashOption {
    cssClass?: string;
    timeOut?: number;
};

@Injectable()
class MessageFlashService {
    public flashInfo(message: string, options?: MessageFlashOption): void {
        options = options ? options : {};
        options.cssClass = 'info';
        this.flashMessage(message, options);
    }

    public flashSuccess(message: string, options?: MessageFlashOption): void {
        options = options ? options : {};
        options.cssClass = 'success';
        this.flashMessage(message, options);
    }

    public flashWarning(message: string, options?: MessageFlashOption): void {
        options = options ? options : {};
        options.cssClass = 'warning';
        this.flashMessage(message, options);
    }

    public flashError(message: string, options?: MessageFlashOption): void {
        options = options ? options : {};
        options.cssClass = 'danger';
        this.flashMessage(message, options);
    }
    
    public flashMessage(message: string, options?: MessageFlashOption): void {};
    public setPosition(position: string): void {};
}

export { MessageFlashService, MessageFlashOption }