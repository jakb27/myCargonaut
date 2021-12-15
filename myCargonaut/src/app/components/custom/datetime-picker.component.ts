import {Component, ElementRef, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: "app-ngb-date-time-picker",
  template: `
    <div ngbDropdown (openChange)="!$event && onTouch()">
      <button
        [class]="parentClass"
        [disabled]="isDisabled"
        class="datepicker btn btn-link"
        ngbDropdownToggle
      >
        {{ _value ? (_value | date: mask:"+0000") : label }}
      </button>
      <div ngbDropdownMenu>
        <ngb-datepicker
          #dp
          [(ngModel)]="date"
          (dateSelect)="getDatetime()"
        ></ngb-datepicker>
        <ngb-timepicker [hourStep]=hourStep [minuteStep]=minuteStep
                        [meridian]="meridian"
                        [ngModel]="time"
                        (ngModelChange)="time = $event; getDatetime()"
        ></ngb-timepicker>
      </div>
    </div>
  `,
  styles: [
    `
      .datepicker {
        color: black;
        border: 1px solid silver;
      }

      .btn-link:disabled {
        color: gray !important;
      }

    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements ControlValueAccessor {
  @Input() mask = "medium";
  @Input() meridian: boolean = false;
  @Input() placeholder: string = "yyyy/MM/dd hh:mm";
  @Input() hourStep = 1;
  @Input() minuteStep = 1;

  date: any;
  time: any = {hour: 0, minute: 0};
  isDisabled!: boolean;
  onChange = (_: any) => {
  };
  onTouch = () => {
  };
  _value: any;
  label: any;
  control: any;

  get parentClass() {
    return this.elementRef.nativeElement.className;
  }

  constructor(private elementRef: ElementRef) {
  }

  getDatetime() {
    let value = null;
    if (!this.date) {
      value = this.placeholder;
      this._value = null;
    } else {
      value = new Date(
        Date.UTC(
          this.date.year,
          this.date.month - 1,
          this.date.day,
          this.time ? this.time.hour : 0,
          this.time ? this.time.minute : 0
        )
      );
      this._value = value;
    }

    this.onChange(this._value);
    this.label = value;
  }

  writeValue(obj: any): void {
    if (obj && obj.getFullYear) {
      const date = new Date(
        Date.UTC(
          obj.getFullYear(),
          obj.getMonth(),
          obj.getDate(),
          obj.getUTCHours(),
          obj.getMinutes()
        )
      );

      this.date = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      this.time = {
        hour: this.hourStep * (Math.round(date.getHours() / this.hourStep)),
        minute: this.minuteStep * (Math.round(date.getMinutes() / this.minuteStep))
      };
      setTimeout(() => {
        this.getDatetime();
      });
    }
    this.getDatetime();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
