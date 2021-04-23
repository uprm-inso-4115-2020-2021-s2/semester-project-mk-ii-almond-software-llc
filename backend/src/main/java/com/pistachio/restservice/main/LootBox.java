package com.pistachio.restservice.main;

import java.util.List;
import java.util.Random;

import org.springframework.data.annotation.Id;

/**
 * Holds 1 (one) lootbox (Part of a complete breakfast) Also holds a static
 * Lootbox Opener with a static randomizer to be used by the controller.
 * 
 * @author igtampe
 *
 */
public class LootBox {

	@Id
	private String lootCrateName;
	private List<String> Monsters;

	public LootBox(String lootCrateName, List<String> Monsters) {
		this.lootCrateName = lootCrateName;
		this.Monsters = Monsters;
	}

	/**
	 * @return the monsters
	 */
	public List<String> getMonsters() {
		return Monsters;
	}

	/**
	 * @param monsters the monsters to set
	 */
	public void setMonsters(List<String> monsters) {
		Monsters = monsters;
	}

	/**
	 * Static randomizer used to randomize *all* lootboxes
	 */
	private static final Random Randomizer = new Random();

	/**
	 * Picks one of the monsters in the provided lootbox
	 * 
	 * @param l
	 * @return
	 */
	public static String OpenLootbox(LootBox l) {
		return l.Monsters.get(Randomizer.nextInt(l.Monsters.size()));
	}

	@Override
	public String toString() {
		return "LootBox [ID=" + lootCrateName + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((lootCrateName == null) ? 0 : lootCrateName.hashCode());
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
		if (lootCrateName == null) {
			if (other.lootCrateName != null) {
				return false;
			}
		} else if (!lootCrateName.equals(other.lootCrateName)) {
			return false;
		}
		return true;
	}

}
