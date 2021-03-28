package com.pistachio.restservice.main;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BattleRepository extends MongoRepository<Battle, String>{

    Optional<Battle> findBySecondPlayerID(String secondPlayerID);
}