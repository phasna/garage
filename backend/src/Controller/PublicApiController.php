<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class PublicApiController extends AbstractController
{
    #[Route('/categories', name: 'api_categories', methods: ['GET'])]
    public function getCategories(): JsonResponse
    {
        $categories = [
            ['name' => 'Tous', 'value' => 'all'],
            ['name' => 'Économique', 'value' => 'Économique'],
            ['name' => 'Compacte', 'value' => 'Compacte'],
            ['name' => 'Berline', 'value' => 'Berline'],
            ['name' => 'SUV', 'value' => 'SUV'],
            ['name' => 'Électrique', 'value' => 'Électrique'],
            ['name' => 'Luxe', 'value' => 'Luxe'],
            ['name' => 'Utilitaire', 'value' => 'Utilitaire'],
        ];

        return new JsonResponse($categories);
    }
}


