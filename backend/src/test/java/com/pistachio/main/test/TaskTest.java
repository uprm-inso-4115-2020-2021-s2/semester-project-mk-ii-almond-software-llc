package com.pistachio.main.test;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.pistachio.restservice.main.Task;

/**
 * Tests task
 * @author igtampe
 *
 */
class TaskTest {

	@Test
	void EqualsTest() {
		Task t1=new Task();
		Task t2=new Task("Help", "me", 1, "D");
		Task t3=new Task("Help", "me", 1, "D");;
		Task t22=new Task("Help", "me", 1, "D");;

		t1.set_ID("1");
		t2.set_ID("2");
		t3.set_ID("3");
		t22.set_ID("2");
		
		
		assertEquals(t1, t1);
		assertEquals(t2, t2);
		assertEquals(t3, t3);

		assertNotEquals(t1, t2);
		assertNotEquals(t2, t3);
		assertNotEquals(t3, t1);
		
		assertEquals(t2, t22);
		
	}
	
	//TODO: Test task completion when its fleshed out

}
