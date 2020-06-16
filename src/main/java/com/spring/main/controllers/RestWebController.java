package com.spring.main.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.main.messege.Response;
import com.spring.main.model.User;
  
@RestController
@RequestMapping("/users")
public class RestWebController {
 
  List<User> users = new ArrayList<User>();
 
  @GetMapping(value = "/getUser")
  public Response getUser() {
	  return new Response("Done", users);
  }

@PostMapping(value = "/save")
  public Response postUser(@RequestBody User u) {
	
	int n = check(u);
	
	if(n==0) {
		User us = new User();
		us.setName(u.getName());
		us.setNumber(u.getNumber());
		users.add(us);
	    return new Response("Done", us);
	}else if(n==2)
		return new Response("Failed", u);
	else return new Response("Exist",u);
  }

	@PutMapping(value="/update/{name}/{number}")
	public Response updateUser(@PathVariable("name")String name, @PathVariable("number")String number) {
		for(int i = 0;i<users.size();i++) {
			if(number.equals(users.get(i).getNumber())) {
					users.get(i).setName(name);
					return new Response("Done", name);
			}
		}return new Response("Failed",name);
	}
	
	@DeleteMapping(value="/delete/{nUser}")
	public Response delete(@PathVariable("nUser") String name) {
		for(int i = 0; i<users.size();i++) {
			if(name.equals(users.get(i).getNumber())) {
				users.remove(i);
				return new Response("Done", name);
			}
		}return new Response("Failed", name);

	}

	private int check(User u) {
		if(u.getName().isBlank() || u.getNumber().isBlank() || 
				u.getNumber().length() < 10 || u.getNumber().length()>10)
			return 2;
		else {
		for(int i=0;i<users.size();i++) {
			if(users.get(i).getNumber().equals(u.getNumber()))
				return 1;
		}return 0;
		}
	}
}