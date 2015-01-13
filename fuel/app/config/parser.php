<?php
return array(
    'extensions' => array(
        'twig' => 'View_Twig',
    ),
    'View_Twig' => array(
        'include' => dirname(APPPATH) . DS . 'vendor' . DS . 'twig' . DS . 'twig' . DS . 'lib' . DS . 'Twig' . DS . 'Autoloader.php',
    ),
);