package br.coim.jcaguiar.provaathenas.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@MappedSuperclass
public class Pessoa {

    @NotBlank(message = "Nome é um campo obrigatório. Favor preenchê-lo.")
    @Length(min = 3, message = "O Nome precisa conter ao menos 3 letras.")
    String nome;

    @NotNull(message = "Data de Nascimento é um campo obrigatório. Favor preenchê-lo.")
    @DateTimeFormat(pattern = "dd/MM/yyyy", iso = DateTimeFormat.ISO.DATE)
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/YYYY")
    @JsonSerialize(using = DateSerializer.class)
    Date dataNasc;

    @NotBlank(message = "CPF é um campo obrigatório. Favor preenchê-lo.")
    @Length(min = 11, max = 11, message = "O CPF precisa conter 11 números.")
    @Column(unique = true)
    String cpf;

    @NotNull(message = "Sexo é um campo obrigatório. Favor preenchê-lo.")
    char sexo;

    @NotNull(message = "Altura é um campo obrigatório. Favor preenchê-lo.")
    Double altura;

    @NotNull(message = "Peso é um campo obrigatório. Favor preenchê-lo.")
    Double peso;

    public Double calculaPesoIdeal() {
        return sexo == 'M' ?
            (72.7 * altura) - 58 :      //fórmula homens
            (62.1 * altura) - 44.7 ;    //fórmula mulheres
    }

}
