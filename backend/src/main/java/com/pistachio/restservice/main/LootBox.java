package com.pistachio.restservice.main;

import java.util.List;
import java.util.Random;

import org.springframework.data.annotation.Id;

/**
 * Holds 1 (one) lootbox (Part of a complete breakfast)
 * Also holds a static Lootbox Opener with a static randomizer to be used by the controller.
 * @author igtampe
 *
 */
public class LootBox {
 
	@Id
	private String ID;
	private List<Monster> Monsters;
	
	public LootBox(String ID, List<Monster> Monsters) {
		this.ID=ID;
		this.Monsters=Monsters;
	}
	
	/**
	 * Static randomizer used to randomize *all* lootboxes
	 */
	private static Random Randomizer = new Random();
	
	/**
	 * Picks one of the monsters in the provided lootbox
	 * @param l
	 * @return
	 */
	public static Monster OpenLootbox(LootBox l) {return l.Monsters.get(Randomizer.nextInt(l.Monsters.size()));}

	@Override
	public String toString() {
		return "LootBox [ID=" + ID + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ID == null) ? 0 : ID.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof LootBox)) {
			return false;
		}
		LootBox other = (LootBox) obj;
		if (ID == null) {
			if (other.ID != null) {
				return false;
			}
		} else if (!ID.equals(other.ID)) {
			return false;
		}
		return true;
	}
	
}
