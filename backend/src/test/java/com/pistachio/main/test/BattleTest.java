package com.pistachio.main.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

import com.pistachio.restservice.main.Battle;
import com.pistachio.restservice.main.Monster;

/**
 * Tests the battle class
 * @author igtampe
 *
 */
class BattleTest {

	@Test
	void EqualsTest() {
		Battle B1 = new Battle("123", "Juan", new ArrayList<Monster>(), "pepito", new ArrayList<Monster>());
		Battle B2 = new Battle("123", "Juan", new ArrayList<Monster>(), "pepito", new ArrayList<Monster>());
		Battle B3 = new Battle("456", "Juan", new ArrayList<Monster>(), "pepito", new ArrayList<Monster>());
		
		assertTrue(B1.equals(B2));
		assertFalse(B1.equals(B3));
	}

	@Test
	void ActionsTest() {
		//Battle B1 = new Battle("123", "Juan", new ArrayList<Monster>(), "pepito", new ArrayList<Monster>());
		//B1.addAction("Help");
		//assertTrue(B1.getActionLog().contains("Help"));
	}
	
}
