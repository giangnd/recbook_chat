import { Component, Input, OnInit } from '@angular/core';
import { RegexHelper } from '../../shared/helpers/regex.helper';
import { ErrorHelper } from '../../shared/helpers/errors.helper';

@Component({
    selector: 'validate-message',
    templateUrl: './validate-message.component.html',
    styleUrls: ['./validate-message.component.sass']
})
export class ValidateMessageComponent implements OnInit {
    @Input() input: any;
    @Input() label: string;
    @Input() minlength: number;
    @Input() maxlength: number;
    @Input() equal: string;
    @Input() equalTo: string;
    @Input() invalidMessage: string;
    @Input() submited: boolean = false;
    private regexHelper = RegexHelper;
    private errorHelper = ErrorHelper;

    ngOnInit(): void {
    }

    hasErrors(): boolean {
        if (this.equal && this.input.value !== this.equal) {
            return true;
        }
        return this.input.invalid;
    }
}