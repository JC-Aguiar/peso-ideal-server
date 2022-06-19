package br.coim.jcaguiar.provaathenas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class ProvaAthenasApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProvaAthenasApplication.class, args);
	}
}
