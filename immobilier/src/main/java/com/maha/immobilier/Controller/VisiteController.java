package com.maha.immobilier.Controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins ="*")
@Tag(name = "Visites", description = "Visites Api ")
@RestController
@RequestMapping("/api/visites")
public class VisiteController {
}
