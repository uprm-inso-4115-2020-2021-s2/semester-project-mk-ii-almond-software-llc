package com.pistachio.main.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;

import com.pistachio.restservice.main.Battle;
import com.pistachio.restservice.main.Player;
import com.pistachio.restservice.main.Task;

/***
 * Tests the functions of the Player class
 * @author igtampe
 *
 */
@TestMethodOrder(OrderAnnotation.class)
class PlayerTest {

	static Player Juan;
	static Player Pepito;
	static Player Jack;
	static Player Jill;
	
	/**
	 * Sets up some players
	 */
	@BeforeAll
	static void Setup() {
		
		//First things first lets create a few players
		Juan=new Player("JuanTheMan", "1234");
		Pepito=new Player("xXx_BigGamer_xXx");
		Jack=new Player("JackieJackson", "1234");
		Jill=new Player("GamerGrill(tm)", "1234");
		
	} 
	
	/**
	 * Tests that users, even different ones instantiated, are equal to each other as long as they have the same username
	 */
	@Test
	@Order(1)
	void EqualsTest() {
		//Now lets test to make sure things are equal.
		assertFalse(Jack.equals(Jill));
		assertTrue(Jack.equals(new Player("JackieJackson")));
	}
	
	/**
	 * Tests that passwords are checked correctly.
	 */
	@Test
	@Order(2)
	void PasswordTest() {
		//Now for passwords:
		assertFalse(Juan.checkPassword("DingDongThisIsWrong"));
		assertTrue(Juan.checkPassword("1234"));
	}
	
	/**
	 * Tests that users instantiated without passwords (users not meant for authentication) throw an exception when asked to be used to authenticate.
	 */
	@Test
	@Order(3)
	void PasswordForNonAuthenticationTest() {
		assertThrows(IllegalStateException.class, () -> {Pepito.checkPassword("This should fail");},"Illegal State Exception did not occur when trying to authenticate a non-authenticatable user.");
	}
	
	/**
	 * Tests that users with cleared passwords (users no longer meant for authentication) throw an exception when asked to be used to authenticate.
	 */
	@Test
	@Order(4)
	void ClearPasswordTest() {
		//Let's clear Juan's password, then try to authenticate.
		Juan.clearPassword();
		assertThrows(IllegalStateException.class, () -> {Juan.checkPassword("This should fail");},"Illegal State Exception did not occur when trying to authenticate a non-authenticatable user.");
	}
	
	/**
	 * Tests that the friendship system works
	 */
	@Test
	@Order(5)
	void FriendTest() {
		
		//Ladies and gentlemen, it is story time.
		
		//let's say Jack wants to become friends with Jill because he is a simp.
		Jill.requestFriendship(Jack); //Jack adds himself to Jill's friend requests.
		
		assertTrue(Jill.getFriendRequests().contains(Jack),"Jack was not added to the list of pending friends. Jack takes this as a sign from God and ceases his ways"); //Let's make sure she received it.
		
		//Jill knows Jack is a simp and decides to reject his friendship.
		Jill.declineFriendship(Jack);

		//Jack decides to try again because he is a nice guy and he deserves this.
		Jill.requestFriendship(Jack);
		
		//Jack gets so insistent that he does it twice, causing an exception
		assertThrows(IllegalArgumentException.class, () -> {
			Jill.requestFriendship(Jack);			
		},"Jack was able to add himself to the list even if he is already in the list. He has duplicated himself. The world is now over.");
		
		//Jack waits patiently. This time, Jill decides to add him and get it over with.
		Jill.acceptFriendship(Jack);
		
		//Let's ensure they both have the friendship now.
		assertTrue(Jill.getConfirmedFriends().contains(Jack));
		assertTrue(Jack.getConfirmedFriends().contains(Jill));
		
		//Jill immediately regrets this decision and decides to remove Jack.
		Jill.removeFriend(Jack);
		
		//let's ensure they're no longer friends.
		assertFalse(Jill.getConfirmedFriends().contains(Jack));
		assertFalse(Jack.getConfirmedFriends().contains(Jill));
		
		//Jill panics and hits the remove friend button twice, causing an exception
		assertThrows(IllegalArgumentException.class, () -> {
			Jill.removeFriend(Jack);;			
		},"Jill was able to delete Jack twice. This has deleted him in real life. Jill is now responsible for murder.");
		
		//Jack, who knows how to hack into Pistachio (do not ask how), has decided he will "accept" a non existent request he has from Jill, causing another exception.
		assertThrows(IllegalArgumentException.class, () -> {
			Jack.acceptFriendship(Jill);;;			
		},"Jack has thwarted our defenses. Pisachio is shut down by the internet authorities of security. The game is over");
		
		//Jack has been thwarted and seeks counseling for his ways. He eventually meets another woman who actually likes him. He lives happily ever after.
		
		//GOOD ENDING
	}
	
	/**
	 * Tests that pistachios can be added correctly
	 */
	@Test
	@Order(6)
	void PistachioTest() {
		//Let's give Juan 200 Pistachios.
		Juan.addPistachio(200);
		
		//Let's verify he has them.
		assertEquals(Juan.getPistachios(), 200,"Someone stole the pistachios while they were on route");
		
		//Now the tax man has come and has decided Uncle Sam needs all of that money. He is charged 200 pistachios.
		Juan.addPistachio(-200);
		
		//Let's verify that he is now broke
		assertEquals(Juan.getPistachios(), 0, "Juan has committed tax fraud");
		
	}
	
	/***
	 * Tests that tasks completed are properly completed.
	 */
	@Test
	@Order(7)
	void TaskTest() {
		
		Task t = new Task("Chop", "Chop a block", 10, "");
		t.set_ID("500"); //maybe this should've been in the constructor but its ok.
		
		Task t2= new Task("Break", "Break a block", 10, "");
		t.set_ID("501");
		
		//add a task as complete
		Juan.markTaskComplete(t);
		
		assertThrows(IllegalArgumentException.class, ()->{
			Juan.markTaskComplete(t);
		},"Juan managed to complete a task twice!");
		
		//Check the task is complete.
		assertTrue(Juan.hasTaskCompleted(t));
		
		//Assert that a task that hasn't been added is not complete
		assertFalse(Juan.hasTaskCompleted(t2));
		
		//make sure that we can still add some
		Juan.markTaskComplete(t2);
		
		//Make sure its also still in
		assertTrue(Juan.hasTaskCompleted(t2));
		
		//Clear tasks
		Juan.clearCompletedTasks();
		
		//Check the task is no longer complete.
		assertFalse(Juan.hasTaskCompleted(t));
		assertFalse(Juan.hasTaskCompleted(t2));
		
	}
	
	/***
	 * Tests that monsters can be added and oranized between collections.
	 */
	@Test
	@Order(8)
	void MonsterTest() {
		//TODO: Test this
	}
	
	/***
	 * Tests that battles can be added, verified, and removed.
	 */
	@Test
	@Order(9)
	void BattleTest() {
		
		Battle B1 = new Battle("123", "Juan", new ArrayList<Object>(), "pepito", new ArrayList<Object>());
		
		//Let's go ahead and add the battle, then remove it.
		Juan.addBattle(B1);
		assertTrue(Juan.getBattles().contains(B1));
		
		//Now let's remove it.
		Juan.removeBattle(B1);
		assertFalse(Juan.getBattles().contains(B1));
		
	}
	
	
	

}
