-- Generado por Oracle SQL Developer Data Modeler 22.2.0.165.1149
--   en:        2024-10-30 13:16:38 ART
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE administrador (
    id                NUMBER(6) NOT NULL,
    vencimiento_clave DATE NOT NULL
);

ALTER TABLE administrador ADD CONSTRAINT administrador_pk PRIMARY KEY ( id );

CREATE TABLE categoria (
    id     NUMBER(4) NOT NULL,
    nombre VARCHAR2(40 BYTE) NOT NULL
);

ALTER TABLE categoria ADD CONSTRAINT categoria_pk PRIMARY KEY ( id );

CREATE TABLE cliente (
    id                 NUMBER(6) NOT NULL,
    dni                NUMBER(9) NOT NULL,
    celular            NUMBER(15) NOT NULL,
    fecha_nacimiento   DATE NOT NULL,
    dom_fis_dom_fis_id NUMBER NOT NULL
);

CREATE UNIQUE INDEX cliente__idx ON
    cliente (
        dom_fis_dom_fis_id
    ASC );

ALTER TABLE cliente ADD CONSTRAINT cliente_pk PRIMARY KEY ( id );

CREATE TABLE "DET-OPER" (
    cantidad           NUMBER(3) NOT NULL,
    precio_unitario    NUMBER(9, 2) NOT NULL,
    descuento_aplicado NUMBER(2),
    operacion_numero   NUMBER(6) NOT NULL,
    publicacion_id     NUMBER(5) NOT NULL
);

ALTER TABLE "DET-OPER" ADD CONSTRAINT "DET-OPER_PK" PRIMARY KEY ( operacion_numero,
                                                                  publicacion_id );

CREATE TABLE dom_fis (
    direccion     VARCHAR2(70 BYTE) NOT NULL,
    localidad     VARCHAR2(70 BYTE) NOT NULL,
    provincia     VARCHAR2(30 BYTE) NOT NULL,
    codigo_postal NUMBER(5) NOT NULL,
    cliente_id    NUMBER(6) NOT NULL,
    dom_fis_id    NUMBER NOT NULL
);

CREATE UNIQUE INDEX dom_fis__idx ON
    dom_fis (
        cliente_id
    ASC );

ALTER TABLE dom_fis ADD CONSTRAINT dom_fis_pk PRIMARY KEY ( dom_fis_id );

CREATE TABLE "DOM-ENV" (
    direccion     VARCHAR2(70 BYTE) NOT NULL,
    localidad     VARCHAR2(70 BYTE) NOT NULL,
    provincia     VARCHAR2(30 BYTE) NOT NULL,
    codigo_postal NUMBER(5) NOT NULL,
    cliente_id    NUMBER(6) NOT NULL
);

ALTER TABLE "DOM-ENV" ADD CONSTRAINT "DOM-ENV_PK" PRIMARY KEY ( cliente_id );

CREATE TABLE marca (
    id     NUMBER(5) NOT NULL,
    nombre VARCHAR2(60) NOT NULL
);

ALTER TABLE marca ADD CONSTRAINT marca_pk PRIMARY KEY ( id );

CREATE TABLE operacion (
    numero           NUMBER(6) NOT NULL,
    total            NUMBER,
    cliente_id       NUMBER(6) NOT NULL,
    fecha            DATE NOT NULL,
    id_envio         VARCHAR2(100 BYTE),
    administrador_id NUMBER(6) NOT NULL,
    estado           VARCHAR2(15 BYTE) NOT NULL,
    factura          BLOB
);

ALTER TABLE operacion ADD CONSTRAINT operacion_pk PRIMARY KEY ( numero );

CREATE TABLE produ_publi (
    producto_codigo NUMBER(5) NOT NULL,
    publicacion_id  NUMBER(5) NOT NULL
);

ALTER TABLE produ_publi ADD CONSTRAINT produ_publi_pk PRIMARY KEY ( producto_codigo,
                                                                    publicacion_id );

CREATE TABLE producto (
    codigo       NUMBER(5) NOT NULL,
    modelo       VARCHAR2(30 BYTE) NOT NULL,
    color        VARCHAR2(25 BYTE),
    alto         NUMBER(3),
    ancho        NUMBER(3),
    profundidad  NUMBER(3),
    peso         NUMBER(3),
    marca_id     NUMBER(5) NOT NULL,
    categoria_id NUMBER(4) NOT NULL
);

ALTER TABLE producto ADD CONSTRAINT producto_pk PRIMARY KEY ( codigo );

CREATE TABLE publicacion (
    id          NUMBER(5) NOT NULL,
    titulo      VARCHAR2(70 BYTE) NOT NULL,
    precio      NUMBER(9, 2) NOT NULL,
    stock       NUMBER(3) NOT NULL,
    imagen      VARCHAR2(200 BYTE) NOT NULL,
    descripcion VARCHAR2(700 BYTE)
);

ALTER TABLE publicacion ADD CONSTRAINT publicacion_pk PRIMARY KEY ( id );

CREATE TABLE usuario (
    id         NUMBER(6) NOT NULL,
    username   VARCHAR2(50 BYTE) NOT NULL,
    mail       VARCHAR2(100 BYTE) NOT NULL,
    contraseña VARCHAR2(255 BYTE) NOT NULL,
    fecha_alta DATE NOT NULL,
    nombre     VARCHAR2(60) NOT NULL,
    apellido   VARCHAR2(60 BYTE) NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id );

ALTER TABLE administrador
    ADD CONSTRAINT administrador_usuario_fk FOREIGN KEY ( id )
        REFERENCES usuario ( id );

ALTER TABLE cliente
    ADD CONSTRAINT cliente_dom_fis_fk FOREIGN KEY ( dom_fis_dom_fis_id )
        REFERENCES dom_fis ( dom_fis_id );

ALTER TABLE cliente
    ADD CONSTRAINT cliente_usuario_fk FOREIGN KEY ( id )
        REFERENCES usuario ( id );

ALTER TABLE "DET-OPER"
    ADD CONSTRAINT "DET-OPER_OPERACION_FK" FOREIGN KEY ( operacion_numero )
        REFERENCES operacion ( numero );

ALTER TABLE "DET-OPER"
    ADD CONSTRAINT "DET-OPER_PUBLICACION_FK" FOREIGN KEY ( publicacion_id )
        REFERENCES publicacion ( id );

ALTER TABLE dom_fis
    ADD CONSTRAINT dom_fis_cliente_fk FOREIGN KEY ( cliente_id )
        REFERENCES cliente ( id );

ALTER TABLE "DOM-ENV"
    ADD CONSTRAINT "DOM-ENV_CLIENTE_FK" FOREIGN KEY ( cliente_id )
        REFERENCES cliente ( id );

ALTER TABLE operacion
    ADD CONSTRAINT operacion_administrador_fk FOREIGN KEY ( administrador_id )
        REFERENCES administrador ( id );

ALTER TABLE operacion
    ADD CONSTRAINT operacion_cliente_fk FOREIGN KEY ( cliente_id )
        REFERENCES cliente ( id );

ALTER TABLE produ_publi
    ADD CONSTRAINT produ_publi_producto_fk FOREIGN KEY ( producto_codigo )
        REFERENCES producto ( codigo );

ALTER TABLE produ_publi
    ADD CONSTRAINT produ_publi_publicacion_fk FOREIGN KEY ( publicacion_id )
        REFERENCES publicacion ( id );

ALTER TABLE producto
    ADD CONSTRAINT producto_categoria_fk FOREIGN KEY ( categoria_id )
        REFERENCES categoria ( id );

ALTER TABLE producto
    ADD CONSTRAINT producto_marca_fk FOREIGN KEY ( marca_id )
        REFERENCES marca ( id );

CREATE OR REPLACE TRIGGER "FKNTM_DET-OPER" BEFORE
    UPDATE OF operacion_numero ON "DET-OPER"
BEGIN
    raise_application_error(-20225, 'Non Transferable FK constraint  on table "DET-OPER" is violated');
END;
/

CREATE OR REPLACE TRIGGER fkntm_dom_fis BEFORE
    UPDATE OF cliente_id ON dom_fis
BEGIN
    raise_application_error(-20225, 'Non Transferable FK constraint  on table DOM_FIS is violated');
END;
/

CREATE OR REPLACE TRIGGER "FKNTM_DOM-ENV" BEFORE
    UPDATE OF cliente_id ON "DOM-ENV"
BEGIN
    raise_application_error(-20225, 'Non Transferable FK constraint  on table "DOM-ENV" is violated');
END;
/

CREATE OR REPLACE TRIGGER fkntm_operacion BEFORE
    UPDATE OF cliente_id ON operacion
BEGIN
    raise_application_error(-20225, 'Non Transferable FK constraint  on table OPERACION is violated');
END;
/

--  ERROR: No Discriminator Column found in Arc FKArc_1 - constraint trigger for Arc cannot be generated 

--  ERROR: No Discriminator Column found in Arc FKArc_1 - constraint trigger for Arc cannot be generated

CREATE SEQUENCE dom_fis_dom_fis_id_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER dom_fis_dom_fis_id_trg BEFORE
    INSERT ON dom_fis
    FOR EACH ROW
    WHEN ( new.dom_fis_id IS NULL )
BEGIN
    :new.dom_fis_id := dom_fis_dom_fis_id_seq.nextval;
END;
/



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                            12
-- CREATE INDEX                             2
-- ALTER TABLE                             25
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           5
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          1
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   2
-- WARNINGS                                 0
