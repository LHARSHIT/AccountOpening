package com.cg.account.TaskListener;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

public class NotifyTaskService implements JavaDelegate{
	
	@Override
	 public void execute(DelegateExecution execution) throws Exception {
		System.out.println("Notification: Task is approaching or past due date");
	}

}
