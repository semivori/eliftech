<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "bank".
 *
 * @property int $id
 * @property string $name
 * @property float $interest_rate
 * @property int $max_loan
 * @property float $down_payment
 * @property int $loan_term
 */
class Bank extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'bank';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'interest_rate', 'max_loan', 'down_payment', 'loan_term'], 'required'],
            [['interest_rate', 'down_payment'], 'number'],
            [['max_loan', 'loan_term'], 'integer'],
            [['name'], 'string', 'max' => 128],
            [['name'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'interest_rate' => 'Interest Rate',
            'max_loan' => 'Max Loan',
            'down_payment' => 'Down Payment',
            'loan_term' => 'Loan Term',
        ];
    }
}
