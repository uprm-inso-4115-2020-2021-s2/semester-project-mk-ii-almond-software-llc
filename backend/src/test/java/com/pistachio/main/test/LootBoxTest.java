package com.pistachio.main.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import com.pistachio.restservice.main.LootBox;
import com.pistachio.restservice.main.Monster;
import com.pistachio.restservice.main.Move;
import com.pistachio.restservice.main.Stats;

class LootBoxTest {

	static List<String> MonsterList;
	static List<String> Nightmares;
	static LootBox lb;
	static LootBox nightmarebox; 
	
	@BeforeAll
	static void Setup() {
		MonsterList=new ArrayList<String>(5);
		MonsterList.add("PISTACHIO:300");
		MonsterList.add("Pain");
		MonsterList.add("Suffering");
		MonsterList.add("Pikachu");
		
		Nightmares = new ArrayList<String>(5);
		Nightmares.add("Amoung Pequeno");
		Nightmares.add("Amoung GRANDE");
		Nightmares.add("Amoung Gigantesco");
		Nightmares.add("Jerry from Seinfeld");
		
		lb=new LootBox("1", MonsterList);
		nightmarebox=new LootBox("2",Nightmares);
		
	}
	
	@Test
	void EqualsTest() {
		assertEquals(lb, lb);
		assertNotEquals(lb, nightmarebox);
		assertEquals(lb, new LootBox("1", new ArrayList<String>()));
	}
	
	@Test
	void LootBoxPickTest() {
		for (int i = 0; i < 3; i++) {
			String M = LootBox.OpenLootbox(nightmarebox);
			assertTrue(nightmarebox.getMonsters().contains(M));
		}
		
		for (int i = 0; i < 3; i++) {
			String M = LootBox.OpenLootbox(lb);
			assertTrue(lb.getMonsters().contains(M));
		}
		
		
	}

}
