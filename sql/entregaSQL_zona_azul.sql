USE zona_azul;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS usuarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (50),
apellidos VARCHAR (50),
nif VARCHAR (10) NOT NULL,
email VARCHAR(50),
telefono_movil VARCHAR (20),
numero_cc VARCHAR (50),
password VARCHAR (128)
);

CREATE TABLE IF NOT EXISTS vehiculos(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
tipo_vehiculo ENUM ('COCHE','MOTO','FURGONETA') NOT NULL,
matricula VARCHAR (50) NOT NULL,
marca VARCHAR (50),
modelo VARCHAR (50),
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

CREATE TABLE IF NOT EXISTS zonas(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR (50),
hora_inicio TIME,
hora_fin TIME,
limite_minutos INT
);

CREATE TABLE IF NOT EXISTS observaciones (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
restriccion VARCHAR (50),
fecha_inicio_restriccion DATETIME,
fecha_fin_restriccion DATETIME
);

CREATE TABLE IF NOT EXISTS observacion_zona (
id_observacion INT UNSIGNED,
id_zona INT UNSIGNED,
FOREIGN KEY (id_observacion) REFERENCES observaciones (id),
FOREIGN KEY (id_zona) REFERENCES zonas (id),
PRIMARY KEY (id_observacion, id_zona)
);
-- considero que una misma restricción puede afectar a más de una zona.

CREATE TABLE IF NOT EXISTS precios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
fecha_inicio_aplicacion DATETIME,
fecha_fin_aplicacion DATETIME,
centimos_por_minuto DECIMAL (5,2),
id_zona INT UNSIGNED,
FOREIGN KEY (id_zona) REFERENCES zonas (id)
);
-- considero que cada zona tiene un precio diferente.
-- considero guardar histórico de observaciones y precios para atender quejas anteriores.
-- se podría hacer lo mismo con las horas de inicio/fin o el límite en minutos de estancia.

CREATE TABLE IF NOT EXISTS estacionamientos(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
fecha_hora_entrada DATETIME,
fecha_hora_salida DATETIME,
precio_estacionamiento_euros DECIMAL (6,2),
limite_superado TINYINT,
importe_multa_euros DECIMAL (7,2),
id_zona INT UNSIGNED,
id_vehiculo INT UNSIGNED,
FOREIGN KEY (id_zona) REFERENCES zonas (id),
FOREIGN KEY (id_vehiculo) REFERENCES vehiculos (id)
);

-- entiendo que sí es necesario registrar el vehículo antes de aparcar. Los usuarios podrían tener un distintivo para
-- colocar en vehículo para identificarlos en vez de por matrícula, pero me parece muy rebuscado.
-- no considero multa como entidad, ya que se entiende que siempre está asociada a un sólo estacionamiento y,
-- en caso de reclamacion que la anule o no, sólo a una reclamación.

CREATE TABLE IF NOT EXISTS reclamaciones(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
fecha TIMESTAMP,
motivo TINYTEXT,
estado ENUM ('tramitada', 'no tramitada'),
resultado ENUM ('aceptada', 'rechazada'),
id_estacionamiento INT UNSIGNED,
id_usuario INT UNSIGNED,
FOREIGN KEY (id_estacionamiento) REFERENCES estacionamientos (id),
FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
);

SET FOREIGN_KEY_CHECKS = 1;