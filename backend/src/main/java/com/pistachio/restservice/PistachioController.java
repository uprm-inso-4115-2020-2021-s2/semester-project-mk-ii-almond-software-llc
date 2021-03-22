package com.pistachio.restservice;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PistachioController {

	private static final String template = "Greetings, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/")
	public Pistachio pistachio(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Pistachio(counter.incrementAndGet(), String.format(template, name));
	}

	@GetMapping("/test")
	public String test() {
		return "BUENAS TARDES FUOKBUOI";
	}

}
