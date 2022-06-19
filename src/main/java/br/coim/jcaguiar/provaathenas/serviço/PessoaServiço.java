package br.coim.jcaguiar.provaathenas.serviço;

import br.coim.jcaguiar.provaathenas.modelo.PessoaENT;
import br.coim.jcaguiar.provaathenas.modelo.PessoaRequestDTO;
import br.coim.jcaguiar.provaathenas.modelo.PessoaRespostaDTO;
import br.coim.jcaguiar.provaathenas.repositorio.Task;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class PessoaServiço {

    @Autowired
    Task task;

    final ModelMapper modelMapper = new ModelMapper();

    public List<PessoaENT> listar() {
        return task.findAll();
    }

    public List<PessoaRespostaDTO> buscarTexto(@NotBlank String texto) {
        final List<PessoaENT> listaPessoas = task.findByNome(texto);
        if(listaPessoas.size() > 0) return converterEntidade(listaPessoas);
        else return List.of(
            converterEntidade(task.findByCpf(texto).orElseThrow()));
    }

    public PessoaENT salvar(@NotNull PessoaENT pessoa) {
        return task.save(pessoa);
    }

    public PessoaENT buscar(@NotBlank String cpf) {
        return task.findByCpf(cpf).orElseThrow();
    }

    public void excluir(@NotBlank String cpf) {
        task.delete(buscar(cpf));
    }

    public void excluir(@NotNull PessoaENT pessoa) {
        task.delete(pessoa);
    }

    public void excluir(@NotNull long id) {
        task.deleteById(id);
    }

    public List<PessoaRespostaDTO> listarDTO() {
        return task.findAll().stream().map(
            entidade -> new PessoaRespostaDTO(
                entidade.getNome(),
                entidade.getCpf(),
                entidade.calculaPesoIdeal())
        ).toList();
    }

    public PessoaENT converterRequestDto(@NotNull PessoaRequestDTO dto) {
        return modelMapper.map(dto, PessoaENT.class);
    }

    public PessoaRequestDTO converterParaRequestDto(@NotNull PessoaENT pessoaENT) {
        return modelMapper.map(pessoaENT, PessoaRequestDTO.class);
    }

    public PessoaRespostaDTO converterEntidade(@NotNull PessoaENT pessoaENT) {
        return new PessoaRespostaDTO(pessoaENT.getNome(), pessoaENT.getCpf(), pessoaENT.calculaPesoIdeal());
    }

    public List<PessoaRespostaDTO> converterEntidade(@NotNull List<PessoaENT> pessoaENT) {
        return pessoaENT.stream().map(this::converterEntidade).toList();
    }


}
