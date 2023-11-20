import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CronogramaItem } from '../model/cronograma';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  generarCronograma(montoPrestamo: number, tasaInteres: number, numeroPagos: number, plazoGracia: number, segurosCargos: number, tasaDescuento: number): Observable<CronogramaItem[]> {
    const cronograma: CronogramaItem[] = [];
    let saldoPendiente = montoPrestamo;
    const tasaInteresMensual = tasaInteres / 12 / 100;
    const cuota = this.calcularCuotaMensual(montoPrestamo, tasaInteresMensual, numeroPagos);
    let vanAcumulado = 0;  // Inicializamos el VAN acumulado

    for (let i = 1; i <= numeroPagos; i++) {
      const interes = saldoPendiente * tasaInteresMensual;
      const amortizacion = cuota - interes;

      // Considerar plazo de gracia
      if (i <= plazoGracia) {
        saldoPendiente = saldoPendiente;
      } else {
        saldoPendiente -= amortizacion;
      }

      // Calcular VAN para el período actual
      const descuento = Math.pow(1 + tasaDescuento / 12 / 100, i);
      const van = (cuota + segurosCargos) / descuento;

      // Actualizar el VAN acumulado
      vanAcumulado += van;

      // Asignar valores al objeto CronogramaItem
      const cronogramaItem: CronogramaItem = new CronogramaItem();
      cronogramaItem.mes = i;
      cronogramaItem.pagoMensual = cuota;
      cronogramaItem.interes = interes;
      cronogramaItem.amortizacion = amortizacion;
      cronogramaItem.segurosCargos = segurosCargos;
      cronogramaItem.totalPago = cuota + segurosCargos;
      cronogramaItem.saldoPendiente = saldoPendiente;
      cronogramaItem.van = vanAcumulado;  // Asignar el VAN acumulado al objeto CronogramaItem

      cronograma.push(cronogramaItem);
    }

    // Ajustar el saldo pendiente al final del último período para que sea 0
    if (numeroPagos > plazoGracia) {
      const ultimaCuota = cronograma[numeroPagos - 1];
      saldoPendiente -= ultimaCuota.amortizacion;
      ultimaCuota.amortizacion += saldoPendiente; // Añadir la diferencia al último pago
      ultimaCuota.saldoPendiente = 0; // Ajustar el saldo pendiente a 0 en la última cuota
    }

    return of(cronograma);
  }

  private calcularCuotaMensual(montoPrestamo: number, tasaInteresMensual: number, numeroPagos: number): number {
    const factor = Math.pow(1 + tasaInteresMensual, numeroPagos);
    const cuotaMensual = (montoPrestamo * tasaInteresMensual * factor) / (factor - 1);
    return cuotaMensual;
  }
}
