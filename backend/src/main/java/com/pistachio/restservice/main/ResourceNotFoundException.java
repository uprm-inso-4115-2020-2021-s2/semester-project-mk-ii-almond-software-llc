package com.pistachio.restservice.main;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException
{
    /**
	 * Eclipse doesn't like it when this is missing and seeing that little triangle on the whole project gives me stress so this is going to go here OK? ok.
	 */
	private static final long serialVersionUID = 8375040938211917468L;

	public ResourceNotFoundException(){}
}
