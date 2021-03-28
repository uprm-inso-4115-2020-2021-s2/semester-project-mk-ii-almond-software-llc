package com.pistachio.restservice.main;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BattleRepository extends MongoRepository<Battle, String>{

    List<Battle> findBySecondPlayerID(String secondPlayerID);

}