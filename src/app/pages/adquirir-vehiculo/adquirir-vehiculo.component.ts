import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CronogramaService } from '../../service/cronograma.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-adquirir-vehiculo',
  templateUrl: './adquirir-vehiculo.component.html',
  styleUrls: ['./adquirir-vehiculo.component.css']
})
export class AdquirirVehiculoComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  miFormulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cronogramaService: CronogramaService
  ) {}

  ngOnInit(): void {
    this.miFormulario = this.formBuilder.group({
      montoPrestamo: ['', Validators.required],
      tasaInteres: ['', Validators.required],
      numeroPagos: ['', Validators.required],
      plazoGracia: ['', Validators.required],
      segurosCargos: ['', Validators.required],
      tasaDescuento: ['', Validators.required],
    });
  }

  get f() {
    return this.miFormulario.controls;
  }

  onSubmit() {
    const valoresFormulario = this.miFormulario.value;
  
    this.cronogramaService.generarCronograma(
      valoresFormulario.montoPrestamo,
      valoresFormulario.tasaInteres,
      valoresFormulario.numeroPagos,
      valoresFormulario.plazoGracia,
      valoresFormulario.segurosCargos,
      valoresFormulario.tasaDescuento,
    ).subscribe(
      (cronograma) => {
        console.log('Cronograma de pagos:', cronograma);
  
        // Navegar a la página cronograma-pagos con los parámetros en el objeto queryParams
        this.router.navigate(['/cronograma-pagos'], {
          queryParams: { cronograma: JSON.stringify(cronograma) }
        });
      },
      (error) => {
        console.error('Error al generar el cronograma:', error);
      }
    );
  }
  
  

  scroll(event: WheelEvent) {
    event.preventDefault();
    const container = this.scrollContainer.nativeElement as HTMLElement;
    container.scrollLeft += event.deltaY;
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement as HTMLElement;
    container.scrollTo({
      left: container.scrollLeft - 900,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement as HTMLElement;
    container.scrollTo({
      left: container.scrollLeft + 900,
      behavior: 'smooth'
    });
  }
}
