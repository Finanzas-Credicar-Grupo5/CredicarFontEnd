import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CronogramaItem } from '../../model/cronograma'; // Ajusta la ruta según tu estructura de archivos

@Component({
  selector: 'app-cronograma-pagos',
  templateUrl: './cronograma-pagos.component.html',
  styleUrls: ['./cronograma-pagos.component.css']
})
export class CronogramaPagosComponent implements OnInit {
  cronograma: CronogramaItem[] = []; // Ajusta el tipo según la estructura de tu cronograma

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      const cronogramaString = (queryParams['cronograma'] || '') as string;
      if (cronogramaString) {
        this.cronograma = JSON.parse(cronogramaString);
      } else {
        console.error('No se encontró el cronograma en los parámetros de la ruta.');
      }
    });
  }
}
