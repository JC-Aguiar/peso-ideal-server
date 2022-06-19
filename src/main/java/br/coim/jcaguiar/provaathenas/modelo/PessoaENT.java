package br.coim.jcaguiar.provaathenas.modelo;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@Entity(name = "Pessoa")
public class PessoaENT extends Pessoa {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    public PessoaENT(
        String nome, Date dataNasc, String cpf, char sexo, Double altura, Double peso) {
        super(nome, dataNasc, cpf, sexo, altura, peso);
    }
}
