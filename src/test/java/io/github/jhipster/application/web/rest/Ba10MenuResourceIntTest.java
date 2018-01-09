package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Ba10Menu;
import io.github.jhipster.application.repository.Ba10MenuRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Ba10MenuResource REST controller.
 *
 * @see Ba10MenuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class Ba10MenuResourceIntTest {

    private static final String DEFAULT_NM_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NM_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CD_COD = "AAAAAAAAAA";
    private static final String UPDATED_CD_COD = "BBBBBBBBBB";

    private static final String DEFAULT_DB_ORDINE = "AAAAAAAAAA";
    private static final String UPDATED_DB_ORDINE = "BBBBBBBBBB";

    private static final String DEFAULT_DL_PATH = "AAAAAAAAAA";
    private static final String UPDATED_DL_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_DL_ICON = "AAAAAAAAAA";
    private static final String UPDATED_DL_ICON = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BL_LINK = false;
    private static final Boolean UPDATED_BL_LINK = true;

    @Autowired
    private Ba10MenuRepository ba10MenuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBa10MenuMockMvc;

    private Ba10Menu ba10Menu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final Ba10MenuResource ba10MenuResource = new Ba10MenuResource(ba10MenuRepository);
        this.restBa10MenuMockMvc = MockMvcBuilders.standaloneSetup(ba10MenuResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ba10Menu createEntity(EntityManager em) {
        Ba10Menu ba10Menu = new Ba10Menu()
            .nmNome(DEFAULT_NM_NOME)
            .cdCod(DEFAULT_CD_COD)
            .dbOrdine(DEFAULT_DB_ORDINE)
            .dlPath(DEFAULT_DL_PATH)
            .dlIcon(DEFAULT_DL_ICON)
            .blLink(DEFAULT_BL_LINK);
        return ba10Menu;
    }

    @Before
    public void initTest() {
        ba10Menu = createEntity(em);
    }

    @Test
    @Transactional
    public void createBa10Menu() throws Exception {
        int databaseSizeBeforeCreate = ba10MenuRepository.findAll().size();

        // Create the Ba10Menu
        restBa10MenuMockMvc.perform(post("/api/ba-10-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba10Menu)))
            .andExpect(status().isCreated());

        // Validate the Ba10Menu in the database
        List<Ba10Menu> ba10MenuList = ba10MenuRepository.findAll();
        assertThat(ba10MenuList).hasSize(databaseSizeBeforeCreate + 1);
        Ba10Menu testBa10Menu = ba10MenuList.get(ba10MenuList.size() - 1);
        assertThat(testBa10Menu.getNmNome()).isEqualTo(DEFAULT_NM_NOME);
        assertThat(testBa10Menu.getCdCod()).isEqualTo(DEFAULT_CD_COD);
        assertThat(testBa10Menu.getDbOrdine()).isEqualTo(DEFAULT_DB_ORDINE);
        assertThat(testBa10Menu.getDlPath()).isEqualTo(DEFAULT_DL_PATH);
        assertThat(testBa10Menu.getDlIcon()).isEqualTo(DEFAULT_DL_ICON);
        assertThat(testBa10Menu.isBlLink()).isEqualTo(DEFAULT_BL_LINK);
    }

    @Test
    @Transactional
    public void createBa10MenuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ba10MenuRepository.findAll().size();

        // Create the Ba10Menu with an existing ID
        ba10Menu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBa10MenuMockMvc.perform(post("/api/ba-10-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba10Menu)))
            .andExpect(status().isBadRequest());

        // Validate the Ba10Menu in the database
        List<Ba10Menu> ba10MenuList = ba10MenuRepository.findAll();
        assertThat(ba10MenuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCdCodIsRequired() throws Exception {
        int databaseSizeBeforeTest = ba10MenuRepository.findAll().size();
        // set the field null
        ba10Menu.setCdCod(null);

        // Create the Ba10Menu, which fails.

        restBa10MenuMockMvc.perform(post("/api/ba-10-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba10Menu)))
            .andExpect(status().isBadRequest());

        List<Ba10Menu> ba10MenuList = ba10MenuRepository.findAll();
        assertThat(ba10MenuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBa10Menus() throws Exception {
        // Initialize the database
        ba10MenuRepository.saveAndFlush(ba10Menu);

        // Get all the ba10MenuList
        restBa10MenuMockMvc.perform(get("/api/ba-10-menus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ba10Menu.getId().intValue())))
            .andExpect(jsonPath("$.[*].nmNome").value(hasItem(DEFAULT_NM_NOME.toString())))
            .andExpect(jsonPath("$.[*].cdCod").value(hasItem(DEFAULT_CD_COD.toString())))
            .andExpect(jsonPath("$.[*].dbOrdine").value(hasItem(DEFAULT_DB_ORDINE.toString())))
            .andExpect(jsonPath("$.[*].dlPath").value(hasItem(DEFAULT_DL_PATH.toString())))
            .andExpect(jsonPath("$.[*].dlIcon").value(hasItem(DEFAULT_DL_ICON.toString())))
            .andExpect(jsonPath("$.[*].blLink").value(hasItem(DEFAULT_BL_LINK.booleanValue())));
    }

    @Test
    @Transactional
    public void getBa10Menu() throws Exception {
        // Initialize the database
        ba10MenuRepository.saveAndFlush(ba10Menu);

        // Get the ba10Menu
        restBa10MenuMockMvc.perform(get("/api/ba-10-menus/{id}", ba10Menu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ba10Menu.getId().intValue()))
            .andExpect(jsonPath("$.nmNome").value(DEFAULT_NM_NOME.toString()))
            .andExpect(jsonPath("$.cdCod").value(DEFAULT_CD_COD.toString()))
            .andExpect(jsonPath("$.dbOrdine").value(DEFAULT_DB_ORDINE.toString()))
            .andExpect(jsonPath("$.dlPath").value(DEFAULT_DL_PATH.toString()))
            .andExpect(jsonPath("$.dlIcon").value(DEFAULT_DL_ICON.toString()))
            .andExpect(jsonPath("$.blLink").value(DEFAULT_BL_LINK.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBa10Menu() throws Exception {
        // Get the ba10Menu
        restBa10MenuMockMvc.perform(get("/api/ba-10-menus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBa10Menu() throws Exception {
        // Initialize the database
        ba10MenuRepository.saveAndFlush(ba10Menu);
        int databaseSizeBeforeUpdate = ba10MenuRepository.findAll().size();

        // Update the ba10Menu
        Ba10Menu updatedBa10Menu = ba10MenuRepository.findOne(ba10Menu.getId());
        // Disconnect from session so that the updates on updatedBa10Menu are not directly saved in db
        em.detach(updatedBa10Menu);
        updatedBa10Menu
            .nmNome(UPDATED_NM_NOME)
            .cdCod(UPDATED_CD_COD)
            .dbOrdine(UPDATED_DB_ORDINE)
            .dlPath(UPDATED_DL_PATH)
            .dlIcon(UPDATED_DL_ICON)
            .blLink(UPDATED_BL_LINK);

        restBa10MenuMockMvc.perform(put("/api/ba-10-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBa10Menu)))
            .andExpect(status().isOk());

        // Validate the Ba10Menu in the database
        List<Ba10Menu> ba10MenuList = ba10MenuRepository.findAll();
        assertThat(ba10MenuList).hasSize(databaseSizeBeforeUpdate);
        Ba10Menu testBa10Menu = ba10MenuList.get(ba10MenuList.size() - 1);
        assertThat(testBa10Menu.getNmNome()).isEqualTo(UPDATED_NM_NOME);
        assertThat(testBa10Menu.getCdCod()).isEqualTo(UPDATED_CD_COD);
        assertThat(testBa10Menu.getDbOrdine()).isEqualTo(UPDATED_DB_ORDINE);
        assertThat(testBa10Menu.getDlPath()).isEqualTo(UPDATED_DL_PATH);
        assertThat(testBa10Menu.getDlIcon()).isEqualTo(UPDATED_DL_ICON);
        assertThat(testBa10Menu.isBlLink()).isEqualTo(UPDATED_BL_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingBa10Menu() throws Exception {
        int databaseSizeBeforeUpdate = ba10MenuRepository.findAll().size();

        // Create the Ba10Menu

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBa10MenuMockMvc.perform(put("/api/ba-10-menus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ba10Menu)))
            .andExpect(status().isCreated());

        // Validate the Ba10Menu in the database
        List<Ba10Menu> ba10MenuList = ba10MenuRepository.findAll();
        assertThat(ba10MenuList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBa10Menu() throws Exception {
        // Initialize the database
        ba10MenuRepository.saveAndFlush(ba10Menu);
        int databaseSizeBeforeDelete = ba10MenuRepository.findAll().size();

        // Get the ba10Menu
        restBa10MenuMockMvc.perform(delete("/api/ba-10-menus/{id}", ba10Menu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ba10Menu> ba10MenuList = ba10MenuRepository.findAll();
        assertThat(ba10MenuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ba10Menu.class);
        Ba10Menu ba10Menu1 = new Ba10Menu();
        ba10Menu1.setId(1L);
        Ba10Menu ba10Menu2 = new Ba10Menu();
        ba10Menu2.setId(ba10Menu1.getId());
        assertThat(ba10Menu1).isEqualTo(ba10Menu2);
        ba10Menu2.setId(2L);
        assertThat(ba10Menu1).isNotEqualTo(ba10Menu2);
        ba10Menu1.setId(null);
        assertThat(ba10Menu1).isNotEqualTo(ba10Menu2);
    }
}
