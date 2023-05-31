import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
    Validators,
} from '@angular/forms';
import { IDefinitionsTable } from 'src/app/core/interfaces';
import { DefinitionsService } from 'src/app/services/definitions.service';

@Component({
    selector: 'app-equation-input',
    templateUrl: './equation-input.component.html',
    styleUrls: ['./equation-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: EquationInputComponent,
            multi: true,
        },
    ],
})
export class EquationInputComponent implements ControlValueAccessor {
    @Input() public title: string = '';
    @Input() public placeholder: string = '';

    public readonly equationFormControl: FormControl = new FormControl(null, [
        Validators.required,
    ]);

    public readonly definitionsTable: IDefinitionsTable;

    private readonly allowedKeys: string[] = [
        'Backspace',
        ' ',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'Tab',
        'Enter',
        'Control',
        'Shift',
        'PageUp',
        'PageDown',
        '*',
        '/',
        '+',
        '-',
        '(',
        ')',
        '.',
    ];

    @ViewChild('equationInput') equationInput!: ElementRef;

    constructor(private readonly definitionsService: DefinitionsService) {
        this.definitionsTable = this.definitionsService.getDefinitionsTable();
    }

    public onEquationInput(event: KeyboardEvent): void {
        // if (
        //     !(event.key === 'a' && event.ctrlKey) &&
        //     !event.key.match(/^[0-9]$/) &&
        //     !this.allowedKeys.includes(event.key)
        // ) {
        //     event.preventDefault();
        // }
    }

    public onChipInput(definitionId: string): void {
        this.equationFormControl.setValue(
            this.equationFormControl.value + ` ${definitionId} `
        );

        this.equationInput.nativeElement.focus();
    }

    public writeValue(equation: any): void {
        this.equationFormControl.setValue(equation);
    }

    public registerOnChange(onChange: any): void {
        this.equationFormControl.valueChanges.subscribe(onChange);
    }

    public registerOnTouched(onTouched: any): void {
        this.equationFormControl.valueChanges.subscribe(onTouched);
    }
}
