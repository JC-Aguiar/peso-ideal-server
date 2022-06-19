package br.coim.jcaguiar.provaathenas.controlador;

import br.coim.jcaguiar.provaathenas.modelo.PessoaENT;
import br.coim.jcaguiar.provaathenas.modelo.PessoaRequestDTO;
import br.coim.jcaguiar.provaathenas.modelo.PessoaRespostaDTO;
import br.coim.jcaguiar.provaathenas.serviço.PessoaServiço;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class PessoaControladorAPI {

    @Autowired
    PessoaServiço serviço;

    @PostMapping("/incluir")
    public ResponseEntity<?> incluir(@RequestBody @Valid PessoaRequestDTO pessoa) {
        System.out.println("POST: /api/incluir");
        try {
            return atualizar(
                serviço.buscar(pessoa.getCpf()),
                pessoa);
        } catch (Exception e) {
            System.out.println("Criando pessoa!");
            final PessoaENT pessoaENT = serviço.converterRequestDto(pessoa);
            serviço.salvar(pessoaENT);
            return new ResponseEntity<>("Pessoa incluída com sucesso.", HttpStatus.OK);
        }
    }

    @GetMapping("/buscar/{nome}")
    public ResponseEntity<?> buscar(@PathVariable("nome") @NotBlank String texto) {
        System.out.println("GET: /api/buscar");
        final List<PessoaRespostaDTO> dtos = serviço.buscarTexto(texto);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/buscarCpf/{cpf}")
    public ResponseEntity<?> buscarCpf(@PathVariable("cpf") @NotBlank String cpf) {
        System.out.println("GET: /api/buscarCpf");
        final PessoaRequestDTO pessoa = serviço.converterParaRequestDto(serviço.buscar(cpf));
        return new ResponseEntity<>(pessoa, HttpStatus.OK);
    }

    public ResponseEntity<?> atualizar(@NotNull PessoaENT pessoa, @NotNull PessoaRequestDTO dto) {
        System.out.println("Atualizar pessoa!");
        pessoa.setNome(dto.getNome());
        pessoa.setDataNasc(dto.getDataNasc());
        pessoa.setSexo(dto.getSexo());
        pessoa.setAltura(dto.getAltura());
        pessoa.setPeso(dto.getPeso());
        serviço.salvar(pessoa);
        return new ResponseEntity<>("Pessoa atualizada com sucesso.", HttpStatus.OK);
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar() {
        System.out.println("GET: /api/listar");
        return new ResponseEntity<>(serviço.listarDTO(), HttpStatus.OK);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletar(@PathVariable("id") @NotNull String cpf) {
        System.out.println("DEL: /api/deletar");
        serviço.excluir(cpf);
        return new ResponseEntity<>("Pessoa removida com sucesso.", HttpStatus.OK);
    }

}
