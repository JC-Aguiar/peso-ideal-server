package br.coim.jcaguiar.provaathenas.repositorio;

import br.coim.jcaguiar.provaathenas.modelo.PessoaENT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;

@Repository
public interface Task extends JpaRepository<PessoaENT, Long> {

    Optional<PessoaENT> findByCpf(@NotBlank String cpf);

    List<PessoaENT> findByNome(@NotBlank String nome);

}
