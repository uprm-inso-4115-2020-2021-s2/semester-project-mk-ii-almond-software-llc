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

	static List<Monster> MonsterList;
	static List<Monster> Nightmares;
	static LootBox lb;
	static LootBox nightmarebox; 
	
	@BeforeAll
	static void Setup() {
		MonsterList=new ArrayList<Monster>(5);
		MonsterList.add(new Monster("PISTACHIO:300", new Stats(),new ArrayList<Move>()));
		MonsterList.add(new Monster("Pain", new Stats(),new ArrayList<Move>()));
		MonsterList.add(new Monster("Suffering", new Stats(),new ArrayList<Move>()));
		MonsterList.add(new Monster("Pikachu", new Stats(),new ArrayList<Move>()));
		
		Nightmares = new ArrayList<Monster>(5);
		Nightmares.add(new Monster("Amoung Pequeno", new Stats(),new ArrayList<Move>()));
		Nightmares.add(new Monster("Amoung GRANDE", new Stats(),new ArrayList<Move>()));
		Nightmares.add(new Monster("Amoung Gigantesco", new Stats(),new ArrayList<Move>()));
		Nightmares.add(new Monster("Jerry from Seinfeld", new Stats(),new ArrayList<Move>()));
		
		lb=new LootBox("1", MonsterList);
		nightmarebox=new LootBox("2",Nightmares);
		
	}
	
	@Test
	void EqualsTest() {
		assertEquals(lb, lb);
		assertNotEquals(lb, nightmarebox);
		assertEquals(lb, new LootBox("1", new ArrayList<Monster>()));
	}
	
	@Test
	void LootBoxPickTest() {
		for (int i = 0; i < 3; i++) {
			Monster M = LootBox.OpenLootbox(nightmarebox);
			assertTrue(nightmarebox.getMonsters().contains(M));
		}
		
		for (int i = 0; i < 3; i++) {
			Monster M = LootBox.OpenLootbox(lb);
			assertTrue(lb.getMonsters().contains(M));
		}
		
		
	}

}
