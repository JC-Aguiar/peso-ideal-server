package br.coim.jcaguiar.provaathenas.controlador;

import br.coim.jcaguiar.provaathenas.modelo.PessoaENT;
import br.coim.jcaguiar.provaathenas.modelo.PessoaRequestDTO;
import br.coim.jcaguiar.provaathenas.modelo.PessoaRespostaDTO;
import br.coim.jcaguiar.provaathenas.serviço.PessoaServiço;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/**")
public class PessoaControlador {

    @Autowired
    PessoaServiço serviço;

    @GetMapping
    public ModelAndView getPessoa() {
        System.out.println("PESSOA-CONTROLLER: GET TESTE");
        final List<PessoaRespostaDTO> pessoas = serviço.listarDTO();
        ModelAndView pagina = new ModelAndView("home");
        pagina.addObject("pessoas", pessoas);
        return pagina;
    }

    @RequestMapping(value = "/cadastrar", method = RequestMethod.POST)
    public ModelAndView postPessoa(
        @ModelAttribute("pessoa") @Valid PessoaRequestDTO dto,
        BindingResult result) {
        System.out.println("PESSOA-CONTROLLER: POST TESTE");
        final PessoaENT pessoa = serviço.converterRequestDto(dto);
        System.out.println("PESSOA-ENTIDADE: " + pessoa);
        return new ModelAndView("home");
    }

}
