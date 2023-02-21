package com.cg.account.TaskListener;

import java.util.logging.Logger;

import org.camunda.bpm.engine.delegate.DelegateTask;
import org.camunda.bpm.engine.delegate.TaskListener;

public class Listener implements TaskListener{
	private final Logger logger=Logger.getLogger(Listener.class.getName());
	@Override
	public void notify(DelegateTask delegateTask) {
		logger.info("Task" + delegateTask.getName() + "has been assigned to" + delegateTask);
		String variableName=(String) delegateTask.getVariable("name");
		logger.info("Accessing process variable with value:" +variableName);
		
		String taskId=delegateTask.getId();
		String processInstanceId=(String) delegateTask.getProcessInstanceId();
		logger.info("Task id:" +taskId+ "process instance id:" +processInstanceId);
	}

}
