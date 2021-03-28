package com.pistachio.main.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.core.annotation.Order;

import com.pistachio.restservice.main.Monster;
import com.pistachio.restservice.main.Move;
import com.pistachio.restservice.main.Stats;

/**
 * Test of the Monster object
 * @author igtampe
 *
 */
@TestMethodOrder(OrderAnnotation.class)
class MonsterTest {

	/**
	 * This monster will not
	 */
	static Monster Chopo;
	
	/**
	 * This monster will be personal
	 */
	static Monster ShinyChopo;
	
	static ArrayList<Move> moves = new ArrayList<Move>();
	static ArrayList<Stats> stats= new ArrayList<Stats>();
	
	@BeforeAll
	static void Setup() {
		// moves.add("Help");
		// moves.add("Me");
		// moves.add("Please");
		
		// stats.add(0);
		// stats.add(1);
		// stats.add(2);
		
		// //Create the monsters
		// Chopo = new Monster("Chopo", stats, moves);
		// ShinyChopo = new Monster("Chopo Shiny", stats, moves);
		
	}
	
	@Test
	@Order(1)
	void equalsTest() {
		// assertFalse(Chopo.equals(ShinyChopo));
		// assertTrue(Chopo.equals(new Monster("chopo", "Chopo", moves, stats)));
		// assertTrue(ShinyChopo.equals(new Monster("11230", "chopo", "Chopo", "igtampe", moves, stats)));
	}

	@Test
	@Order(2)
	void movesTest() {
		
		// //Both monsters should have 3 moves. We shouldn't be able to replace move 4
		// assertThrows(IllegalArgumentException.class, () -> {
		// 	ShinyChopo.ReplaceMove("Pls fail", 3);
		// },"We were able to replace move 4 when move 4 doesn't exist");
		
		// //Now try to replace move 3 with another move we already have
		// assertThrows(IllegalArgumentException.class, () -> {
		// 	ShinyChopo.ReplaceMove("Help", 2);
		// },"We were able to replace move 3 with a move we already have.");
		
		// //Let's replace move 3 with a move we can alctually replace
		// ShinyChopo.ReplaceMove("I am ok", 2);
		
		// //Let's assert we actually replaced it
		// assertEquals("I am ok", ShinyChopo.getMoves().get(2));
		
		// //Now let's try to add a move we already have
		// assertThrows(IllegalArgumentException.class, () -> {
		// 	ShinyChopo.AddMove("I am ok");
		// },"We were able to add a duplicate move");
		
		// //Let's add a move that we can add
		// ShinyChopo.AddMove("This is a lie");
		
		// //Let's assert we actually added it in the right spot
		// assertEquals("This is a lie", ShinyChopo.getMoves().get(3));
		
		// //Now let's try to add another move which shouldn't be able to be done.
		// assertThrows(IllegalStateException.class, () -> {
		// 	ShinyChopo.AddMove("pls fail");
		// },"we were able to add a 5th move.");
		
	}
	
}
