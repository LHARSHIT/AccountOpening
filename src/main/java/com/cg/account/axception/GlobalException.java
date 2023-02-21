package com.cg.account.axception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.cg.account.vo.LoginResponse;

@ControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(value = Exception.class)
	public ResponseEntity<LoginResponse> handleException(Exception ex) {
		LoginResponse error = new LoginResponse();
		error.setErrorCode(HttpStatus.BAD_REQUEST.value());
		error.setMessage(ex.getMessage());
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

}
