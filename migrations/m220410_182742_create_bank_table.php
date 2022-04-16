<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%bank}}`.
 */
class m220410_182742_create_bank_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%bank}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(128)->notNull(),
            'interest_rate' => $this->double()->unsigned()->notNull(),
            'max_loan' => $this->integer()->unsigned()->notNull(),
            'down_payment' => $this->double()->unsigned()->notNull(),
            'loan_term' => $this->smallInteger()->unsigned()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%bank}}');
    }
}
