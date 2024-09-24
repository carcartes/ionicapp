import { Viaje } from '../interfaces/viaje.interface';  // Importa la interfaz Viaje si es necesario

// Exporta la lista de viajes
export const todosLosViajes: Viaje[] = [
  // Campus San Andrés de Concepción
  {
    origen: 'Campus San Andrés de Concepción',
    destino: 'Penco',
    horaSalida: '17:50',
    horaLlegada: '18:25',
    precio: 24.99,
    asientosDisponibles: 1
    
  },
  {
    origen: 'Campus San Andrés de Concepción',
    destino: 'Talcahuano',
    horaSalida: '18:00',
    horaLlegada: '18:30',
    precio: 19.99,
    asientosDisponibles: 2
  },
  {
    origen: 'Campus San Andrés de Concepción',
    destino: 'San Pedro de la Paz',
    horaSalida: '14:50',
    horaLlegada: '15:20',
    precio: 24.99,
    asientosDisponibles: 1
  },
  {
    origen: 'Campus San Andrés de Concepción',
    destino: 'Chiguayante',
    horaSalida: '15:50',
    horaLlegada: '14:30',
    precio: 24.99,
    asientosDisponibles: 1
  },
  {
    origen: 'Campus San Andrés de Concepción',
    destino: 'Hualpen',
    horaSalida: '11:50',
    horaLlegada: '12:10',
    precio: 24.99,
    asientosDisponibles: 1
  },
  
  // Campus Alameda
  {
    origen: 'Campus Alameda',
    destino: 'Quilicura',
    horaSalida: '08:00',
    horaLlegada: '08:30',
    precio: 5.00,
    asientosDisponibles: 3
  },
  {
    origen: 'Campus Alameda',
    destino: 'Santiago Centro',
    horaSalida: '12:30',
    horaLlegada: '12:45',
    precio: 3.00,
    asientosDisponibles: 2
  },

  // Campus Antonio Varas
  {
    origen: 'Campus Antonio Varas',
    destino: 'Providencia',
    horaSalida: '09:00',
    horaLlegada: '09:15',
    precio: 2.50,
    asientosDisponibles: 4
  },
  {
    origen: 'Campus Antonio Varas',
    destino: 'Ñuñoa',
    horaSalida: '16:00',
    horaLlegada: '16:20',
    precio: 2.80,
    asientosDisponibles: 1
  },

  // Campus Educación Continua
  {
    origen: 'Campus Educación Continua',
    destino: 'Santiago Centro',
    horaSalida: '13:00',
    horaLlegada: '13:20',
    precio: 2.00,
    asientosDisponibles: 3
  },
  {
    origen: 'Campus Educación Continua',
    destino: 'Estación Central',
    horaSalida: '17:00',
    horaLlegada: '17:15',
    precio: 2.50,
    asientosDisponibles: 2
  },

  // Campus Maipú
  {
    origen: 'Campus Maipú',
    destino: 'Cerrillos',
    horaSalida: '08:00',
    horaLlegada: '08:20',
    precio: 1.50,
    asientosDisponibles: 3
  },
  {
    origen: 'Campus Maipú',
    destino: 'Padre Hurtado',
    horaSalida: '14:00',
    horaLlegada: '14:20',
    precio: 2.00,
    asientosDisponibles: 2
  },

  // Campus Melipilla
  {
    origen: 'Campus Melipilla',
    destino: 'Talagante',
    horaSalida: '09:00',
    horaLlegada: '09:30',
    precio: 4.00,
    asientosDisponibles: 1
  },
  {
    origen: 'Campus Melipilla',
    destino: 'El Monte',
    horaSalida: '15:00',
    horaLlegada: '15:30',
    precio: 4.50,
    asientosDisponibles: 4
  },

  // Campus Padre Alonso de Ovalle
  {
    origen: 'Campus Padre Alonso de Ovalle',
    destino: 'San Miguel',
    horaSalida: '11:00',
    horaLlegada: '11:15',
    precio: 2.50,
    asientosDisponibles: 2
  },
  {
    origen: 'Campus Padre Alonso de Ovalle',
    destino: 'Santiago Centro',
    horaSalida: '17:30',
    horaLlegada: '17:45',
    precio: 3.00,
    asientosDisponibles: 1
  },

  // Campus Plaza Norte
  {
    origen: 'Campus Plaza Norte',
    destino: 'Conchalí',
    horaSalida: '08:00',
    horaLlegada: '08:10',
    precio: 1.50,
    asientosDisponibles: 4
  },
  {
    origen: 'Campus Plaza Norte',
    destino: 'Huechuraba',
    horaSalida: '18:30',
    horaLlegada: '18:45',
    precio: 2.00,
    asientosDisponibles: 2
  },

  // Campus Plaza Oeste
  {
    origen: 'Campus Plaza Oeste',
    destino: 'Lo Espejo',
    horaSalida: '07:30',
    horaLlegada: '07:45',
    precio: 2.00,
    asientosDisponibles: 3
  },
  {
    origen: 'Campus Plaza Oeste',
    destino: 'Cerrillos',
    horaSalida: '14:30',
    horaLlegada: '14:45',
    precio: 2.50,
    asientosDisponibles: 1
  },

  // Campus Plaza Vespucio
  {
    origen: 'Campus Plaza Vespucio',
    destino: 'La Florida',
    horaSalida: '09:00',
    horaLlegada: '09:15',
    precio: 1.50,
    asientosDisponibles: 4
  },
  {
    origen: 'Campus Plaza Vespucio',
    destino: 'Puente Alto',
    horaSalida: '16:00',
    horaLlegada: '16:20',
    precio: 2.00,
    asientosDisponibles: 3
  },

  // Campus Puente Alto
  {
    origen: 'Campus Puente Alto',
    destino: 'La Florida',
    horaSalida: '10:00',
    horaLlegada: '10:20',
    precio: 1.50,
    asientosDisponibles: 2
  },
  {
    origen: 'Campus Puente Alto',
    destino: 'Pirque',
    horaSalida: '15:00',
    horaLlegada: '15:30',
    precio: 2.50,
    asientosDisponibles: 3
  },

  // Campus San Bernardo
  {
    origen: 'Campus San Bernardo',
    destino: 'El Bosque',
    horaSalida: '12:00',
    horaLlegada: '12:15',
    precio: 1.80,
    asientosDisponibles: 2
  },
  {
    origen: 'Campus San Bernardo',
    destino: 'Buin',
    horaSalida: '17:30',
    horaLlegada: '18:00',
    precio: 2.50,
    asientosDisponibles: 1
  },

  // Campus San Carlos de Apoquindo
  {
    origen: 'Campus San Carlos de Apoquindo',
    destino: 'Las Condes',
    horaSalida: '13:00',
    horaLlegada: '13:20',
    precio: 2.80,
    asientosDisponibles: 4
  },
  {
    origen: 'Campus San Carlos de Apoquindo',
    destino: 'La Reina',
    horaSalida: '19:00',
    horaLlegada: '19:25',
    precio: 3.00,
    asientosDisponibles: 1
  },

  // Campus San Joaquín
  {
    origen: 'Campus San Joaquín',
    destino: 'Macul',
    horaSalida: '10:30',
    horaLlegada: '10:45',
    precio: 2.00,
    asientosDisponibles: 3
  },
  {
    origen: 'Campus San Joaquín',
    destino: 'La Granja',
    horaSalida: '14:00',
    horaLlegada: '14:20',
    precio: 2.20,
    asientosDisponibles: 2
  },

  // Campus Valparaíso
  {
    origen: 'Campus Valparaíso',
    destino: 'Viña del Mar',
    horaSalida: '11:00',
    horaLlegada: '11:20',
    precio: 2.50,
    asientosDisponibles: 3
  },
  {
    origen: 'Campus Valparaíso',
    destino: 'Quilpué',
    horaSalida: '17:00',
    horaLlegada: '17:30',
    precio: 3.00,
    asientosDisponibles: 2
  },

  // Campus Viña del Mar
  {
    origen: 'Campus Viña del Mar',
    destino: 'Reñaca',
    horaSalida: '08:30',
    horaLlegada: '08:45',
    precio: 1.80,
    asientosDisponibles: 4
  },
  {
    origen: 'Campus Viña del Mar',
    destino: 'Concón',
    horaSalida: '13:00',
    horaLlegada: '13:30',
    precio: 2.20,
    asientosDisponibles: 2
  },

  // Campus Arauco
  {
    origen: 'Campus Arauco',
    destino: 'Lebu',
    horaSalida: '08:30',
    horaLlegada: '09:30',
    precio: 5.00,
    asientosDisponibles: 2
  },
  {
    origen: 'Campus Arauco',
    destino: 'Cañete',
    horaSalida: '14:30',
    horaLlegada: '15:30',
    precio: 4.50,
    asientosDisponibles: 3
  },

  // Campus Nacimiento
  {
    origen: 'Campus Nacimiento',
    destino: 'Los Ángeles',
    horaSalida: '10:00',
    horaLlegada: '11:00',
    precio: 6.00,
    asientosDisponibles: 1
  },
  {
    origen: 'Campus Nacimiento',
    destino: 'Angol',
    horaSalida: '15:00',
    horaLlegada: '16:30',
    precio: 6.50,
    asientosDisponibles: 2
  },

  // Campus Villarrica
  {
    origen: 'Campus Villarrica',
    destino: 'Pucón',
    horaSalida: '09:00',
    horaLlegada: '09:30',
    precio: 3.50,
    asientosDisponibles: 4
  },
  {
    origen: 'Campus Villarrica',
    destino: 'Lican Ray',
    horaSalida: '14:30',
    horaLlegada: '15:00',
    precio: 4.00,
    asientosDisponibles: 2
  },

  // Campus Puerto Montt
  {
    origen: 'Campus Puerto Montt',
    destino: 'Puerto Varas',
    horaSalida: '10:00',
    horaLlegada: '10:20',
    precio: 3.00,
    asientosDisponibles: 3
  },
  {
    origen: 'Campus Puerto Montt',
    destino: 'Frutillar',
    horaSalida: '16:30',
    horaLlegada: '17:00',
    precio: 4.50,
    asientosDisponibles: 2
  }
];
