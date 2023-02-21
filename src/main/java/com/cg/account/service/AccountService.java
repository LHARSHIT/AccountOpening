package com.cg.account.service;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component(value = "accountService")
public class AccountService {
	
	public boolean approval;
	
	private final Logger LOGGER = LoggerFactory.getLogger(LoggerDelegate.class.getName());
	public void saveAccountData(DelegateExecution execution) throws Exception{
		String name=(String) execution.getVariable("name");
		String address=(String) execution.getVariable("address");
	    String age=(String) execution.getVariable("age");
		String email=(String) execution.getVariable("email");
	    String salary=(String) execution.getVariable("salary");
	    
		LOGGER.info("Name: "+name+"Address: "+address+"Age: "+age+"Email: "+email+"Salary: "+salary);
	
		execution.setVariable("requestId",12345);

}
	public void approval(boolean approval) {
		this.approval=approval;
	}
	
	public boolean approval() {
		return this.approval;
	}
	
//	public int updateAccountData(DelegateExecution execution)throws Exception {
//		int requestId = (int) execution.getVariable("requestId");
//		String name=(String) execution.getVariable("name");
//		String address=(String) execution.getVariable("address");
//	    String age=(String) execution.getVariable("age");
//		String email=(String) execution.getVariable("email");
//	    String salary=(String) execution.getVariable("salary");
//		String comment=(String) execution.getVariable("comment");
//		
//		LOGGER.info("Name: "+name+"Address: "+address+"Age: "+age+"Email: "+email+"Salary: "+salary+"Comment: "+comment);
//
//		return 0;
//	}
}
