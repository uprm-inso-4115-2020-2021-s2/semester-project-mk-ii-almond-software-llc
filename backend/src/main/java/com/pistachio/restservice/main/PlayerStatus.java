package com.pistachio.restservice.main;

/**
 * An enum of all possible statuses for a player
 * @author igtampe
 *
 */
public enum PlayerStatus {
	
	/**
	 * User is offline
	 */
	Offline,
	
	/**
	 * User is online and not battling
	 */
	Online,
	
	/**
	 * User is online and is battling
	 */
	InBattle;
}
