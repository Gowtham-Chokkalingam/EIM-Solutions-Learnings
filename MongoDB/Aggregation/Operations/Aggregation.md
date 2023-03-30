_Aggregation_

<!--? Collection - {$match} - {$sort} - {$group} - {$project} -->

<!-- {$match} - Filtering Phase -->

`db.persons.aggregate([{$match:{gender:"female"}}])`

