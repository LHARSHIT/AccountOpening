package com.cg.account.service;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class LoggerDelegate implements JavaDelegate {
	
	private final Logger LOGGER = LoggerFactory.getLogger(LoggerDelegate.class.getName());

	@Override
	public void execute(DelegateExecution execution) throws Exception {
		
		LOGGER.info("Process Instance ID: "+ execution.getProcessInstanceId());

	}

}
