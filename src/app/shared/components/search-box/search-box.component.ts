import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  @Output() onValue: EventEmitter<string> = new EventEmitter(); //para hacer la emision del termino, onEnter es un evento, el evento que se emite es termino
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); // se emite cuando la persona deja de escribir

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject(); //es un observable especial, se emite cuando dejo de escribir,para eso utilizamos el metodo de ciclo de vida onInit

  value: string = '';

  ngOnInit() {
    this.debouncer
      .pipe(
        debounceTime(300) //milesimas de segundos antes de emitir el proximo valor
      )
      .subscribe((valor) => {
        this.onDebounce.emit(valor);
      });
  } //Se dispara una unica vez cuando el componente es creado,pipe permite transformar la salida del subscribe

  emitValue(value: string) {
    this.onValue.emit(this.value);
  }

  teclaPresionada() {
    this.debouncer.next(this.value);
  }
}
