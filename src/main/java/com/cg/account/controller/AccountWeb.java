package com.cg.account.controller;

import java.util.HashMap;

import com.cg.account.service.CustomUserDetailsService;
import com.cg.account.utils.JwtUtil;
import com.cg.account.vo.AccountDetails;
import com.cg.account.vo.LoginRequest;
import com.cg.account.vo.LoginResponse;
import com.cg.account.vo.TaskStatus;
//import com.cg.account.vo.TaskVariable;
import org.camunda.bpm.engine.ProcessEngine;
//import org.camunda.bpm.engine.ProcessEngineConfiguration;
//import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@RequestMapping("/account/")
public class AccountWeb {

    @Autowired
    RuntimeService runtimeService;
    @Autowired
    ProcessEngine processEngine;
    @Autowired
    TaskService taskService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtTokenUtil;

    @PostMapping("/new-account")
    public ResponseEntity<AccountDetails> startAccountOpeningJourney(@RequestBody AccountDetails newAccountOp){
        HashMap<String,Object> newAccountMap = new HashMap<>();
        newAccountMap.put("name",newAccountOp.getName());
        newAccountMap.put("address",newAccountOp.getAddress());
        newAccountMap.put("age",newAccountOp.getAge());
        newAccountMap.put("email",newAccountOp.getEmail());
        newAccountMap.put("salary",newAccountOp.getSalary());


        ProcessInstance processInstance =  runtimeService.startProcessInstanceByKey("Account1234", newAccountMap);
        if(null != processInstance){
            newAccountOp.setReferenceNo(processInstance.getProcessInstanceId());
            return new ResponseEntity<>(newAccountOp, HttpStatus.OK);
        }
        return new ResponseEntity<>( newAccountOp,HttpStatus.OK);
}
    @PutMapping("/updateTaskStatus")
    public void updateTaskStatus(@RequestBody TaskStatus taskStatus) {
    	System.out.println(taskStatus.getTaskId());
    	System.out.println(taskStatus.getTaskName());
    	System.out.println(taskStatus.getTaskStatus());
    	
    	RuntimeService runtimeService=processEngine.getRuntimeService();
    	TaskService taskService=processEngine.getTaskService();
    	
    	Task task=taskService.createTaskQuery().taskId(taskStatus.getTaskId()).singleResult();
    	
    	if(taskStatus.getTaskName().equalsIgnoreCase("manager")) {
    		if(taskStatus.getTaskStatus().equalsIgnoreCase("approved")) {
    			runtimeService.setVariable(task.getExecutionId(), "isManagerApproved", true);
    			taskService.complete(task.getId());
    		}
    		
    		else if(taskStatus.getTaskStatus().equalsIgnoreCase("rejected")) {
    			runtimeService.setVariable(task.getExecutionId(), "isManagerApproved", false);
    			taskService.complete(task.getId());
    			
    		}
    	}
    }
    
    @PutMapping("/updateVariable")
    public void updateVariable(@RequestBody TaskStatus taskStatus) {
    	
    	RuntimeService runtimeService=processEngine.getRuntimeService();
    	TaskService taskService=processEngine.getTaskService();
    	
    	Task task=taskService.createTaskQuery().taskId(taskStatus.getTaskId()).singleResult();
    	
    	if(taskStatus.getTaskName().equalsIgnoreCase("Front desk for updating customer")) {
    		
    		if(taskStatus.getTaskStatus().equalsIgnoreCase("variable is Added")) {
    			runtimeService.setVariable(task.getExecutionId(), "addVariable", true);
    			taskService.complete(task.getId());
    		}
    		
    		else if(taskStatus.getTaskStatus().equalsIgnoreCase("variable is not added")) {
    			runtimeService.setVariable(task.getExecutionId(), "addVariable", false);
    			taskService.complete(task.getId());
    			
    		}
    	}
    }
    
    @PostMapping("/authenticate")
    public String generateToken(@RequestBody LoginRequest authRequest) throws Exception {
       try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
            );
       } catch (BadCredentialsException ex) {
           throw new Exception("inavalid username or password",ex);
           }
       return jwtTokenUtil.generateToken(authRequest.getUserName());
       
    }
	
}
    
    