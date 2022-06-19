package br.coim.jcaguiar.provaathenas.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString @EqualsAndHashCode
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PessoaRequestDTO {

    //    @NotBlank(message = "Nome é um campo obrigatório. Favor preenchê-lo.")
    @Length(min = 3, message = "O Nome precisa conter ao menos 3 letras.")
    String nome;

    //    @NotNull(message = "Data de Nascimento é um campo obrigatório. Favor preenchê-lo.")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Temporal(TemporalType.DATE)
    Date dataNasc;

    @NotBlank(message = "CPF é um campo obrigatório. Favor preenchê-lo.")
    @Length(min = 11, max = 11, message = "O CPF precisa conter 11 números.")
    String cpf;

    @NotNull(message = "Sexo é um campo obrigatório. Favor preenchê-lo.")
    char sexo;

    @NotNull(message = "Altura é um campo obrigatório. Favor preenchê-lo.")
    Double altura;

    @NotNull(message = "Peso é um campo obrigatório. Favor preenchê-lo.")
    Double peso;

}
