import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// 1. Definición del modelo de datos con TypeScript
interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  categoria: string;
}

@Component({
  selector: 'app-root',
  standalone: true, // Arquitectura moderna sin módulos independientes
  imports: [CommonModule, ReactiveFormsModule], // Importamos las herramientas necesarias
  templateUrl: './app.component.html', // Vinculado a tu archivo HTML
  styleUrls: ['./app.component.css']  // Vinculado a tu archivo CSS
})
export class AppComponent {
  // 2. Estado de la aplicación: Arreglo inicial de tareas
  tareas: Tarea[] = [
    { id: 1, titulo: 'Entregar paquete en Av. Juárez 405', completada: false, categoria: 'Urgente' },
    { id: 2, titulo: 'Recoger pedido en Restaurante El Húngaro', completada: true, categoria: 'Comida' },
    { id: 3, titulo: 'Llevar documentación a oficina central', completada: false, categoria: 'Oficina' }
  ];

  // 3. Formulario Reactivo con Validación (Mínimo 5 caracteres)
  formTarea = new FormGroup({
    nuevoTitulo: new FormControl('', [Validators.required, Validators.minLength(5)]),
    nuevaCategoria: new FormControl('General')
  });

  // 4. Función para agregar una nueva tarea a la lista
  agregarTarea() {
    if (this.formTarea.valid) {
      const tituloControl = this.formTarea.get('nuevoTitulo');
      const categoriaControl = this.formTarea.get('nuevaCategoria');
      
      this.tareas.push({
        id: Date.now(), // ID único basado en el tiempo
        titulo: tituloControl?.value || '',
        completada: false,
        categoria: categoriaControl?.value || 'General'
      });
      
      // Limpiar formulario
      this.formTarea.reset({ nuevoTitulo: '', nuevaCategoria: 'General' });
    }
  }

  // 5. Función para alternar el estado de completado
  marcarComoCompletada(id: number) {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada; // Reactividad directa
    }
  }

  // 6. Simulación conceptual de una petición HTTP (Simulando el HttpClient)
  sincronizarConServidor() {
    console.log("Enviando datos al servidor...");
    alert("¡Datos del repartidor sincronizados con éxito en la nube!");
  }
}